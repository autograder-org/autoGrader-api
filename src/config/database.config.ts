import { DataSource } from "typeorm";
import { DBConnection } from "../entities/DBConnection.js";
import { User } from "../entities/User.js";
import { EnvConfiguration } from "./env.config.js";

const AppDataSource = new DataSource({
  type: EnvConfiguration.DB_TYPE as "postgres",
  host: EnvConfiguration.DB_HOST,
  port: +EnvConfiguration.DB_PORT,
  username: EnvConfiguration.DB_USERNAME,
  password: EnvConfiguration.DB_PASSWORD,
  database: EnvConfiguration.DB_NAME,
  entities: [User, DBConnection], // use path.join() for windows
  synchronize: true,
  migrationsRun: false,
  // logging: true,
  // dropSchema: true,
});

export { AppDataSource };
