import { AppDataSource } from "../config/database.config";
import { DBConnection } from "../entities";
import logMessage, { Severity } from "./loggerUtil.util";

export const checkDBConnectionRepeatedly = () => {
  // We try to see if we have established connection to the database, else we try doing it again after a given interval
  setInterval(async () => {
    await connectDB();
  }, 1000);
};

export const connectDB = async (): Promise<boolean> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()

      .then(async () => {
        console.log("Data Source has been initialized!");

        const connection =
          (await DBConnection.find())[0] ||
          DBConnection.create({
            i: 0,
          });

        connection.i += 1;
        logMessage(
          "Updating DB Connection entry",
          "dbConnectivity Util",
          "DB Connection succesful",
          Severity.INFO
        );
        await connection.save();

        return true;
      })
      .catch(async (err) => {
        // console.log(err);
        // catching errors - but don't want to pollute logs with a line every 1 second
        console.error(
          "Error during Data Source initialization retrying in 1 second",
          err
        );

        return false;
      });
  }

  return true;
};
