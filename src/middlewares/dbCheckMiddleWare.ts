import { DBConnection } from "../entities/DBConnection.js";
import logMessage, { Severity } from "../utils/loggerUtil.util.js";

// setting up database check for the user end point
export const dbCheck = async (req: any, res: any, next: any) => {
  if (req.path === "/v5/user/self" || req.path === "/v5/user") {
    try {
      const connection = (await DBConnection.find())[0];
      if (connection) {
        next();
      } else {
        logMessage(
          "Issue connecting to DB",
          "dbCheck MiddleWare",
          "No connection object entry found in DBConnection Table",
          Severity.ERROR
        );
        res.status(503).end();
      }
    } catch (error: any) {
      logMessage(
        "Issue connecting to DB",
        "dbCheck MiddleWare",
        error.code,
        Severity.ERROR
      );
      res.status(503).end();
    }
  } else {
    next();
  }
};
