import "reflect-metadata";
import { EnvConfiguration } from "./config/env.config.js";
import createApp from "./app.js";
import { checkDBConnectionRepeatedly } from "./utils/dbConnectivity.util.js";
import logger from "./logger.js";
import logMessage, { Severity } from "./utils/loggerUtil.util.js";
class Server {
  constructor() {
    this.bootstrap();
  }

  // bootstrap
  async bootstrap() {
    checkDBConnectionRepeatedly();
    const app = createApp();
    logMessage("App created", "Server Startup","Server Start", Severity.INFO);
    app.listen(EnvConfiguration.PORT, () => {
      console.log("TCP server established on port ", EnvConfiguration.PORT);
    });
  }
}



new Server();
