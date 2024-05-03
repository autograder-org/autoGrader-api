import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
class EnvConfiguration {
  // APP
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;

  // DB
  static DB_TYPE = process.env.DB_TYPE;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT || 5432;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_NAME = process.env.DB_NAME;

  // LOG
  static LOG_LEVEL = process.env.LOG_LEVEL;

  static USER_CREATED_TOPC = process.env.USER_CREATED_TOPC || "new-user";

  static EMAIL_VALIDITY_MINUTES = parseInt(process.env.EMAIL_VALIDITY_MINUTES || "2");
}

export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
  INTEGRATION = "integration"
}

export { EnvConfiguration };
