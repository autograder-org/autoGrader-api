import winston from "winston";
import { format } from "winston";
const { combine, errors, colorize } = format;
const env = process.env.NODE_ENV;

const logger =
  env !== "development"
    ? winston.createLogger({
        format: combine(
          winston.format.timestamp({
            format: "YYYY-MM-DDTHH:mm:ss",
          }),
          winston.format.printf((info) => {
            let logEntry = {
              time: info.timestamp,
              level: info.level.toUpperCase(),
              ...logMessageToJson(info.message)
            };

            // Include additional context if available
            //    Need to define the log message type to enforce good logging practices
            //   if (info.context) {
            //     logEntry.context = info.context;
            //   }

            return JSON.stringify(logEntry);
          })
        ),
        level: "info",
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: "/tmp/webapp.log" }),
        ],
      })
    : winston.createLogger({
        format: combine(
          winston.format.timestamp({
            format: "YYYY-MM-DDTHH:mm:ssZ",
          }),
          winston.format.printf((info) => {
            let logEntry = {
              time: info.timestamp,
              level: info.level.toUpperCase(),
              ...logMessageToJson(info.message)
            };

            // Include additional context if available
            //    Need to define the log message type to enforce good logging practices
            //   if (info.context) {
            //     logEntry.context = info.context;
            //   }

            return JSON.stringify(logEntry);
          })
        ),
        level: "debug",
        transports: [new winston.transports.Console()],
      });

interface LogMessage {
  action: string;
  location: string;
  reason: string;
}

function logMessageToJson(logMessage: string): LogMessage {
  const regex = /^(.+)\. Occurred at: (.+)\. Reason: (.+)$/;
  const match = logMessage.match(regex);

  if (match) {
    return {
      action: match[1],
      location: match[2],
      reason: match[3],
    };
  } else {
    throw new Error(`Invalid log message format ${logMessage}`);
  }
}

export default logger;
