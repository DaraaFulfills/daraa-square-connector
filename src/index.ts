// stdlib
import { format } from "util";
import fs from "fs";

// npm
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "isomorphic-fetch";
import session from "express-session"
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import {Webhook} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';

import { ShopifyError } from "@shopify/shopify-api/dist/error";
import * as swaggerUI from "swagger-ui-express";
import YAML from "yaml";

// local packages
import register from "./Webhooks/register"
import addHandlers from "./Webhooks/handlers"
import { redisInit } from "./helpers"

// tsoa generated
// import { RegisterRoutes } from "./routes/routes";

// types
import { Request, Response, NextFunction } from "express";
import { ValidateError, validateSpecConfig } from "tsoa";
import { AuthQuery } from "@shopify/shopify-api"

dotenv.config()

const PORT = process.env["PORT"] || 3000; ;
// const baseUrl = 'https://shopify.daraa.io';
// const baseUrl = 'https://daraa-shopify-connector-dot-virtual-ellipse-326610.ue.r.appspot.com';
const baseUrl = 'https://4000-cs-272155155727-default.cs-us-east1-vpcf.cloudshell.dev'
// const path = 'https://4000-cs-272155155727-default.cs-us-east1-vpcf.cloudshell.dev/auth?shop=daraa-shops.myshopify.com'
redisInit({url:'10.161.37.227'})
console.log('API KEY:')
console.log(process.env.SHOPIFY_API_KEY);
const SCOPES=[
    'read_inventory',
    'read_products', 
    'read_orders',
    'read_shipping',
    'write_shipping'
]
const {
    SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET
} = process.env

!(SHOPIFY_API_KEY && SHOPIFY_API_SECRET)?console.log('not initializing'):
Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES,
    HOST_NAME: baseUrl.replace(/https:\/\//, ""),
    IS_EMBEDDED_APP: false,
    // all supported versions are available, as well as "unstable" and "unversioned"
    API_VERSION: ApiVersion.April22,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),    
  });
console.log('Initialized')  

const ACTIVE_SHOPIFY_SHOPS = {};
const USE_ONLINE_TOKENS = false;
const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";

const app = express();
app.set("top-level-oauth-cookie", TOP_LEVEL_OAUTH_COOKIE);
app.set("active-shopify-shops", ACTIVE_SHOPIFY_SHOPS);
app.set("use-online-tokens", USE_ONLINE_TOKENS);

app.use(cookieParser(Shopify.Context.API_SECRET_KEY));
// Remember path is relative to root not src
const swaggerJson = JSON.parse(
  fs.readFileSync("./public/swagger.json", "utf-8")
);
addHandlers(app, ACTIVE_SHOPIFY_SHOPS, baseUrl)

async function main() {
    app.use((req, res, next) => {
        console.log(req.method);
        console.log(req.path);
        // console.log(req.file);
        // console.log(req.headers);
        console.log(req.body);
        next();
      });
      app.use(function errorHandler(
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction
      ): Response | void {
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
    /* Note: I thought this wasn't necessary anymore, but
        https://tsoa-community.github.io/docs/getting-started.html
        says it is.
    */
    // Use body parser to read sent json payload
    // app.use(
    //     bodyParser.urlencoded({
    //     extended: true,
    //     })
    // );
    // app.use(cors());
    // app.use(bodyParser.json());

    app.get('/auth', async function(req, res){
        console.log(req.query);        
        const shop = req.query.shop;
        if(!shop || typeof shop != 'string'){
            return false;
        }
        
        let authRoute = await Shopify.Auth.beginAuth(
            req,
            res,
            shop,
            '/auth/callback',
            false,
          );
          console.log('authRoute')
          console.log(authRoute)
          return res.redirect(authRoute);
    })
 
    // Register webhooks after OAuth completes
    app.get('/auth/callback', async (req, res) => {
        try {
            register(req, res, ACTIVE_SHOPIFY_SHOPS, baseUrl);
        } catch (error) {
            console.error(error); // in practice these should be handled more gracefully
        }
    });

  app.get("/", (req, res) => {
    res.send('<a href="/daraa">Restart your nightmare</a>');
  });

  app.get("/test", async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    if(!test_session){
        return res.send("No Session");
    }
    const hooks = await Webhook.all({
      session: test_session,
    });
    // console.log(hooks);
    res.json(hooks);
  })

  app.get('/daraa', async (req,res)=>{
      res.redirect('/auth?shop=daraa-shops.myshopify.com')
  })
  app.get("/session", async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    if(!test_session){
        return res.send("No Session");
    }
    res.json(test_session);
  })

  app.use(
    ["/openapi", "/docs", "/swagger"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
  );

  
  app.post('/webhooks', async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
    } catch (error) {
      console.log(error);
    }
  });
//   RegisterRoutes(app);
  app.listen(PORT);
  console.log("Shopify Connector Listening");
}
main();
