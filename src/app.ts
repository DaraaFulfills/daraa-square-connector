import fs from "fs";
import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";
import "isomorphic-fetch";
import * as swaggerUI from "swagger-ui-express";
import * as crypto from "crypto";
import {
    getToken,
    getFirstTokenName,
    disableToken,
} from "./helpers/tokenManager";

const { auth } = require("google-auth-library");

export const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
require("dotenv").config();
const projectId = process.env.GOOGLE_PROJECT_ID;
const parent = "projects/70588820651/secrets/Square-Token";

const frontendpath = process.env.FRONTEND_PATH;
const squarepath = process.env.SQ_APP_PATH;
const domain = frontendpath?.includes("daraa") ? ".daraa.io" : "localhost";

var corsOptions = {
    origin: frontendpath,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

RegisterRoutes(app);

// Remember path is relative to root not src
const swaggerJson = JSON.parse(
    fs.readFileSync("./public/swagger.json", "utf-8")
);
app.use(
    ["/openapi", "/docs", "/swagger"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});

async function secretExists() {
    const client = new SecretManagerServiceClient();
    const [versions] = await client.listSecretVersions({
        parent: parent,
    });

    // versions.some((version) => {
    //   console.log(`${version.state}`);
    // });
    return versions.some((version) => version.state === "ENABLED");
}

app.get("/", (req, res) => {
    // res.send("Already logged in");
    secretExists().then((loggedIn) =>
        !loggedIn
            ? res.send(
                  "<button onclick=\"window.location.href='/authorize';\">Login With Square</button>"
              )
            : res.send("Already logged in")
    );
    // res.end();
});

//TODO This is just for the square qatest since no backend account database exists
// This should be replaced by querying the user row and checking which rows have auth tokens existing already
// Should be moved to core daraa api rather than square specific connector
app.get("/logout", async (req, res) => {
    // Create a client to interact with Secret Manager

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set(
        "Authorization",
        `Client ${process.env.SQ_APPLICATION_SECRET}`
    );
    const token_name = await getFirstTokenName();
    const acc_token = await getToken(token_name);

    fetch(`${squarepath}/oauth2/revoke`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
            client_id: process.env.SQ_APPLICATION_ID,
            access_token: acc_token,
        }),
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);

            console.log("cookie cleared");
            res.clearCookie("squareLoggedIn", {
                httpOnly: false,
                path: "/",
                domain: domain,
            });

            //? May be issue with disabling token if endpoint fails
            disableToken(token_name);

            // res.redirect("frontendpath/connect");
            // destroyToken();
            res.end();
        })
        .catch((error) => {
            console.error("Error revoking token:", error);
            res.status(500).send("Error obtaining access token");
        });
    // secretExists().then((result) => res.send(result));
});

function setCookie(res) {
    res.cookie("squareLoggedIn", "true", {
        httpOnly: false,
        path: "/",
        domain: domain,
    });
}

app.get("/authorize", (req, res) => {
    //TODO: The front-end will send a request this route with a Square Login username & password
    // open up the square login in the backend
    //either it succeed or fail to login
    secretExists().then((loggedIn) => {
        if (loggedIn) {
            setCookie(res);
            return res.redirect(`${frontendpath}/square`);
        } else {
            const applicationId = process.env.SQ_APPLICATION_ID;
            //TODO: change it to production url when deploy
            // const connectHost = process.env.REACT_APP_SQ_ENVIRONMENT.toLowerCase() === "production"
            //   ? "https://connect.squareup.com"
            //   : "https://connect.squareupsandbox.com";
            const connectHost = squarepath;

            //TODO: choose needed scope
            const scopes = [
                "ITEMS_READ",
                "MERCHANT_PROFILE_READ",
                "ORDERS_READ",
                "INVENTORY_READ",
                "PAYMENTS_READ",
                // "ITEMS_WRITE",
                // "ORDERS_WRITE",
                // "MERCHANT_PROFILE_WRITE",
                // "INVENTORY_WRITE",
                //   "PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS",
                //   "PAYMENTS_WRITE",
            ];

            const locale = "en-US"; // Adjust the locale as needed

            const session = "false";

            //encrypt a CSRF token for the 'state' field
            const state = "This is a myself testing";
            const encryptedState = encryptToken(state);

            // Store the state in cookie for later validation
            res.cookie("state", encryptedState);

            if (applicationId) {
                const authorizationUrl =
                    `${connectHost}/oauth2/authorize?` +
                    new URLSearchParams([
                        ["client_id", applicationId],
                        ["scope", scopes.join(" ")], // Join the array into a single string
                        ["session", session],
                        ["state", encryptedState],
                    ]);

                //direct user to square for authorization code
                console.log("Got here");
                console.log(authorizationUrl);
                res.redirect(authorizationUrl);
            } else {
                console.error(
                    "square application id does not exist in the env file"
                );
                res.send("redirecting square page failed");
            }
            res.end();
        }
    });
});

//square callback path
app.get("/authorize/auth-code", (req, res) => {
    const queryParams = new URLSearchParams(
        req.url.slice(req.url.indexOf("?"))
    );
    const authorizationCode = queryParams.get("code");
    const state = queryParams.get("state");

    console.log("Authorization Code:", authorizationCode);

    // Store the authorization code in a cookie
    res.cookie("authorizationCode", authorizationCode);

    // Verify the state
    console.log("State is:", state);
    const savedState = req.cookies.state;
    if (savedState != state) {
        console.log("Wrong State field! Possible CSRF risks");
        res.end();
    }

    //getting access token from square with verified authorization code
    if (authorizationCode) {
        fetch(`${squarepath}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.SQ_APPLICATION_ID,
                client_secret: process.env.SQ_APPLICATION_SECRET,
                code: authorizationCode,
                grant_type: "authorization_code",
                redirect_uri:
                    "https://4000-cs-261762283044-default.cs-us-central1-pits.cloudshell.dev/authorize/get-token",
            }),
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON);
                console.log("access token is: ", responseJSON.access_token);
                console.log("refresh token is: ", responseJSON.refresh_token);

                //TODO: store refresh token

                // Store access token in Google Secret Manager
                storeToken(responseJSON.access_token);

                // res.send("successfully authorized");
                setCookie(res);
                res.redirect(`${frontendpath}/square`);
            })
            .catch((error) => {
                console.error("Error obtaining access token:", error);
                res.status(500).send("Error obtaining access token");
            });
    } else {
        res.redirect(`${frontendpath}/connect/deny?service=Square`);
    }
});

// Encrypt CSRF token
const encryptToken = (token: string) => {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32); // Generate a random encryption key
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedToken = cipher.update(token, "utf8", "hex");
    encryptedToken += cipher.final("hex");
    return `${encryptedToken}.${key.toString("hex")}.${iv.toString("hex")}`;
};

// Decrypt CSRF token
const decryptToken = (encryptedToken: string) => {
    const algorithm = "aes-256-cbc";
    const [token, key, iv] = encryptedToken.split(".");
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key, "hex"),
        Buffer.from(iv, "hex")
    );
    let decryptedToken = decipher.update(token, "hex", "utf8");
    decryptedToken += decipher.final("utf8");
    return decryptedToken;
};

const storeToken = async (token: string) => {
    try {
        // Retrieve the service account email
        // const myself = await auth.getClient();
        // const email = myself.email;
        // console.log(`Service account email: ${email}`);

        // Set the project ID and secret ID
        const projectId = process.env.GOOGLE_PROJECT_ID; // Replace with project ID
        const secretId = process.env.SQ_APPLICATION_SECRET; // Replace with desired secret ID

        // // Construct the parent resource
        // const parent = `projects/${projectId}`;

        // Create a client to interact with Secret Manager
        const client = new SecretManagerServiceClient();

        // // Create the secret with automation replication
        // const [secret] = await client.createSecret({
        //   parent: parent,
        //   secretId: secretId,
        //   secret: {
        //     replication: {
        //       automatic: {},
        //     },
        //   },
        // });
        // console.info(`Created secret: ${secret.name}`);

        // Add a version with a payload onto the secret.
        const [version] = await client.addSecretVersion({
            parent: parent,
            payload: {
                data: Buffer.from(token, "utf8"),
            },
        });

        console.info(`Added secret version ${version.name}`);
    } catch (error) {
        console.error("Error creating secret:", error);
    }

    // const responsePayload = accessResponse.payload.data.toString('utf8');
    // console.info(`Payload: ${responsePayload}`);

    return;
};

const refreshToken = async () => {
    const refreshToken = "YOUR_REFRESH_TOKEN";
    const clientId = process.env.SQ_APPLICATION_ID;
    const clientSecret = process.env.SQ_APPLICATION_SECRET;
    const apiUrl = `${squarepath}/oauth2/token`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error refreshing access token: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        const { access_token, expires_in, refresh_token } = data;

        // TODO: update access token in secret manager

        console.log("Access token refreshed successfully:", access_token);

        // TODO: update refresh token

        console.log("Refresh token:", refresh_token);

        return access_token;
    } catch (error) {
        console.error(
            "An error occurred while refreshing access token:",
            error
        );
        throw error;
    }
};

// Call the refreshToken function to refresh the access token
// refreshToken()
//   .then((accessToken) => {
//   })
//   .catch((error) => {
//     console.error('An error occurred in refreshing token:', error);
//   });
