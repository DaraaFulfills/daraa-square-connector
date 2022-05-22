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
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  
    next();
  });

  app.get('/', (req, res)=>{
      res.send('Hello There');
  })