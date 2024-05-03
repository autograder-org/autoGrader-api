import express from "express";
import { User } from "../entities";
import logMessage, { Severity } from "../utils/loggerUtil.util";
/**
 * In this middleware function, we process the PUT and GET requests that are sent to the users end point
 * We return 403 forbidden error for email address that have validated flag as false
 */

export const emailValidityMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    req.path === "/v5/user/self" &&
    (req.method == "PUT" || req.method == "GET")
  ) {
    const authHeader = req.headers.authorization;

    if (authHeader == undefined) {
      return res.status(401).end();
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );

    const [username, password] = credentials.split(":");

    try {
      const user = await User.findOneBy({
        username: username,
      });

      if (!user) {
        logMessage(
          "Unauthorized user trying to access",
          "emailValidityMiddleware",
          "User not present in DB",
          Severity.ERROR
        );
        return res.status(400).end();
      }

      const validatedUser = user.validated;

      if (validatedUser) {
        next();
      } else {
        logMessage(
          "Unauthorized user trying to access",
          "emailValidityMiddleware",
          "Email not validated",
          Severity.ERROR
        );
        return res.status(403).end();
      }
    } catch (error: any) {
      logMessage(
        "Error in checking email validation for user",
        "emailValidityMiddleware",
        error,
        Severity.ERROR
      );
      return res
        .status(500)
        .json({ message: `Internal Server Error ${error}` })
        .end();
    }
  } else {
    next();
  }
};
