import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../routes/routes.js";
import {
  methodNotAllowed,
  badRequestHandler,
  cacheControl,
} from "./errorHandler.middleware.js";
import { EnvConfiguration, Environment } from "../config/env.config.js";
import swaggerJson from "../routes/swagger.json";
import { errorHandler } from "../errorHandling/ErrorHandler.js";
import { basicAuthMiddleware } from "./basicAuth.middleware.js";
import { dbCheck } from "./dbCheckMiddleWare.js";
import { emailValidityMiddleware } from "./emailValidityMiddleWare.js";

export const configMiddleware = (app: any) => {
  app.use(express.json());
  
  // Custom error handling middleware for JSON parsing errors
  app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof SyntaxError) {
      return res.status(400).end();
    }
    next(err);
  });

  app.use(cors());
  app.use(cacheControl, methodNotAllowed, badRequestHandler);
  app.use(dbCheck);
  app.use(basicAuthMiddleware, emailValidityMiddleware);
  RegisterRoutes(app);

  app.use(errorHandler);

  if (EnvConfiguration.NODE_ENV === Environment.DEVELOPMENT) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
  }
};
