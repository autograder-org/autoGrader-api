/**
 * This util function will help us simplify the process of writing log messages
 * We enforce structure for log messages
 */

import logger from "../logger";

export enum Severity {
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
}

export default function logMessage(
  whatHappened: string,
  whereHappened: string,
  whyHappened: string,
  severity: Severity
): string {
  /**
   * Constructs a log message based on the provided details.
   *
   * @param whatHappened - Description of what happened.
   * @param whereHappened - Location or context where it happened.
   * @param whyHappened - Reason or cause for what happened.
   * @param severity - Severity level of the log message (INFO, ERROR, WARNING).
   * @returns Constructed log message.
   */

  // Construct log message based on severity enum
  let logMessage: string;
  switch (severity) {
    case Severity.INFO:
      logMessage = `${whatHappened}. Occurred at: ${whereHappened}. Reason: ${whyHappened}`;
      logger.info(logMessage);
      break;
    case Severity.ERROR:
      logMessage = `${whatHappened}. Occurred at: ${whereHappened}. Reason: ${whyHappened}`;
      logger.error(logMessage);
      break;
    case Severity.WARNING:
      logMessage = `${whatHappened}. Occurred at: ${whereHappened}. Reason: ${whyHappened}`;
      logger.warn(logMessage);
      break;
    default:
      logMessage = `Invalid severity level: ${severity}`;
      logger.error(logMessage);
  }

  return logMessage;
}
