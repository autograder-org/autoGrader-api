import { PubSub } from "@google-cloud/pubsub";
import { Environment } from "../config/env.config";
import logMessage, { Severity } from "./loggerUtil.util";

const pubSubClient = new PubSub();

export default async function publish(
  dataBuffer: Buffer,
  topic: string
): Promise<void> {

  // do not publish for integration testing environment
  const environment = process.env.NODE_ENV;

  if (environment == Environment.INTEGRATION) {
    return;
  }

  try {
    const messageId = await pubSubClient.topic(topic).publishMessage({
      data: dataBuffer,
    });
    logMessage(
      `Sent user created messsage to topic ${topic}, messageId: ${messageId}`,
      "UserService._publishMessage",
      "No issues present",
      Severity.INFO
    );
  } catch (error) {
    logMessage(
      `Error while publishing messsage to topic ${topic}`,
      "publishMesssageFunction",
      (error as Error).message,
      Severity.ERROR
    );
    throw new Error((error as Error).message);
  }
}
