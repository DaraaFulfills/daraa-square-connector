import fs from 'fs';
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


export const app = express();

const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://example2.com'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

const corsOptions  = "*";

app.use(cors(corsOptions));


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

app.get('/', (req, res) => {
  res.send('<button onclick="window.location.href=\'/authorize\';">Login With Square</button>');
  res.end();
});


app.get('/authorize', (req, res) => {

    // res.send("Directing you to authorization with Square...");
    const applicationId = process.env.SQ_APPLICATION_ID;

    //TODO: change it to production when deploy
    // const connectHost = process.env.REACT_APP_SQ_ENVIRONMENT.toLowerCase() === "production"
    //   ? "https://connect.squareup.com"
    //   : "https://connect.squareupsandbox.com";
    const connectHost = "https://connect.squareupsandbox.com";
  
    const scopes = [
      "ITEMS_READ",
      "MERCHANT_PROFILE_READ",
      "PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS",
      "PAYMENTS_WRITE",
      "PAYMENTS_READ",
    ];
  
    const locale = "en-US"; // Adjust the locale as needed
  
    const session = "false";
  
    const state = "This is a myself testing";
    // You can generate a CSRF token for the 'state' field if required
  
    // Store the state in localStorage for later validation
    // localStorage.setItem("state", JSON.stringify(state));
  
    if(applicationId){
        const authorizationUrl =
        `${connectHost}/oauth2/authorize?` +
        new URLSearchParams([
            ["client_id", applicationId],
            ["scope", scopes.join(" ")], // Join the array into a single string
            ["session", session],
            ["state", state],
        ]);

        res.redirect(authorizationUrl);

    }else{
        console.error("square application id does not exist in the env file");
        res.send("redirecting square page failed");
    }
    res.end();
  });

  app.get('/authorize/auth-code', (req, res) =>{
    const queryParams = new URLSearchParams(req.url.slice(req.url.indexOf('?')));
    const authorizationCode = queryParams.get("code");
    const state = queryParams.get("state");

    console.log("Authorization Code:", authorizationCode);
    // TODO: Verify the state
    console.log("State is:", state);


    if(authorizationCode){
        fetch("https://connect.squareupsandbox.com/oauth2/token", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            client_id: process.env.SQ_APPLICATION_ID,
            client_secret: process.env.SQ_APPLICATION_SECRET,
            code: authorizationCode,
            grant_type: "authorization_code",
            redirect_uri: "https://4000-cs-261762283044-default.cs-us-central1-pits.cloudshell.dev/authorize/get-token",
            }),
            })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);
            console.log(responseJSON.access_token);
            // Perform additional actions with the access token or send a response
            res.send("successfully authorized");
        })
        .catch((error) => {
            console.error("Error obtaining access token:", error);
            // Handle the error and send an appropriate response
            res.status(500).send("Error obtaining access token");
        });
    }else{
        res.send('<div>You deny access to Square</div><button onclick="window.location.href=\'/\';">Back to Home</button>');
    }
  });
  

