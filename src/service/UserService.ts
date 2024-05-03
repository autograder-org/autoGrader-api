import { CreateUserAccount } from "../controllers/requestModels/CreateUserAccount.js";
import { UpdateUserAccount } from "../controllers/requestModels/UpdateUserAccount.js";
import { EmailT, setEmail } from "../controllers/types/EmailT.js";
import { User } from "../entities/User.js";
import {
  AuthError,
  BadInputError,
  BadRequestError,
  ExpiredTokenError,
  NotFoundError,
} from "../errorHandling/Errors.js";
import { hashPasswordAndEncode } from "../utils/bcryptHashing.util.js";
import { checkForEmptyString } from "../utils/inputValidation.util.js";
import logMessage, { Severity } from "../utils/loggerUtil.util.js";

// Imports the Google Cloud client library
import { PubSub } from "@google-cloud/pubsub";
import { EnvConfiguration } from "../config/env.config.js";
import publish from "../utils/pubSub.util.js";

export default class UserService {
  // Creates a client; cache this for further use
  private pubSubClient = new PubSub();

  async getUser(userName: EmailT | undefined): Promise<User> {
    if (!userName || userName == "") {
      logMessage(
        "Invalid username",
        "UserService.getUser",
        "Username null/undefined or empty username passed",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }

    try {
      setEmail(userName);
    } catch (error) {
      logMessage(
        "Invalid username",
        "UserService.getUser",
        "Invalid username format",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }

    const user = await User.findOneBy({ username: userName });

    if (!user) {
      logMessage(
        "User not found",
        "UserService.getUser",
        "User not present in the database",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }
    logMessage(
      "Retrieving user",
      "UserService.getUser",
      "Retrieving user details from the database",
      Severity.INFO
    );

    return user;
  }

  async createUser(userData: CreateUserAccount): Promise<User> {
    const { username, first_name, last_name, password } = userData;

    checkForEmptyString(userData);

    // validate if email is in the right format
    try {
      setEmail(username);
    } catch (err) {
      logMessage(
        "Invalid username",
        "UserService.createUser",
        "Invalid username format",
        Severity.ERROR
      );
      throw new BadInputError("Invalid email provided " + username);
    }

    // check if we already don't have a user with this email id
    const existingUser = await User.findOneBy({
      username: username,
    });

    logMessage(
      "Checking for existing user",
      "UserService.createUser",
      "Checking if user already exists in the database",
      Severity.INFO
    );

    if (existingUser) {
      logMessage(
        "Checking for existing user",
        "UserService.createUser",
        "User already exists",
        Severity.ERROR
      );
      throw new BadRequestError(
        "User with email id " + username + " already exists."
      );
    }

    logMessage(
      "Creating new user",
      "UserService.createUser",
      "Creating a new user account",
      Severity.INFO
    );

    // create this user and save them in the db
    const newUser = User.create();

    newUser.username = username;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.password = await hashPasswordAndEncode(username, password);

    await newUser.save();

    // await this.publishMessage(newUser.username);

    return newUser;
  }

  async updateUser(
    updatedUserDetails: UpdateUserAccount,
    userName?: EmailT
  ): Promise<User> {
    if (!userName || userName == "") {
      logMessage(
        "Invalid username",
        "UserService.updateUser",
        "Username null/undefined or empty username passed",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }

    checkForEmptyString(updatedUserDetails);

    try {
      setEmail(userName);
    } catch (err) {
      logMessage(
        "Invalid username",
        "UserService.updateUser",
        "Invalid username format",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }

    if (
      !updatedUserDetails.first_name &&
      !updatedUserDetails.last_name &&
      !updatedUserDetails.password
    ) {
      throw new BadInputError(
        "At least one property must be provided to update the user account."
      );
    }

    logMessage(
      "Retrieving existing user",
      "UserService.updateUser",
      "Retrieving user details from the database",
      Severity.INFO
    );

    // get this user from the db
    const existingUser = await User.findOneBy({
      username: userName,
    });

    if (!existingUser) {
      logMessage(
        "Invalid username",
        "UserService.updateUser",
        "User already exists",
        Severity.ERROR
      );
      throw new AuthError("Unauthenticated user");
    }

    const { first_name, last_name, password } = updatedUserDetails;

    logMessage(
      "Updating user details",
      "UserService.updateUser",
      "Updating user account details",
      Severity.INFO
    );

    if (first_name) existingUser.first_name = first_name;
    if (last_name) existingUser.last_name = last_name;
    if (password)
      existingUser.password = await hashPasswordAndEncode(userName, password);
    // updating lastModified date
    existingUser.lastModified = new Date();

    return await existingUser.save();
  }

  async verifyEmail(userName: string, token:string): Promise<void> {
    try {
      setEmail(userName);
    } catch (error: any) {
      logMessage(
        "Invalid username",
        "UserService.verifyEmail",
        "Invalid username format",
        Severity.ERROR
      );
      throw new BadInputError("Invalid email provided " + userName);
    }
    // get the user
    const user = await User.findOneBy({
      username: userName,
    });

    if (user == null) {
      logMessage(
        "User not found",
        "verifyEmail",
        "User not found in DB",
        Severity.ERROR
      );
      throw new NotFoundError("User not found");
    }

    // check if the token is the same as in the db
    if(!user.validityToken || (user.validityToken != token )){
      logMessage("Issue with validting token", "UserService.verifyEmail", "Mismatch between incoming validity token and token in db", Severity.ERROR);
      throw new ExpiredTokenError("Invalid email validation link passed");
    }

    logMessage(
      "Logging time values",
      `validity time in db ${user.validity} now date ${new Date()}`,
      "Debug log",
      Severity.INFO
    );
    // check for validity
    if (user.validity <= new Date()) {
      logMessage(
        "Error in validating user email",
        "verifyEmail",
        "Email validity passed current date time",
        Severity.WARNING
      );
      throw new ExpiredTokenError("Token validity expired");
    } else {
      // if validity still exists, set valid as true
      user.validated = true;
      await user.save();
      logMessage("Set user email as valid", "UserService.verifyEmail", "Request received within validity period", Severity.INFO);
    }
  }

  async setEmailValidity(validUpto: Date, username: string): Promise<void> {
    // find the user
    const user = await User.findOneBy({
      username,
    });

    if (user == null) {
      logMessage(
        "Issue setting email validity",
        "setEmailValidityEndPoint",
        "User not found in DB",
        Severity.ERROR
      );
      throw new NotFoundError();
    }

    logMessage(`Updating user email validity to ${validUpto}`, "UserService.setEmailValidity","User found in the DB", Severity.INFO);
    // Set validity in db
    user.validity = validUpto;

    await user.save();

    logMessage('User updated in the DB', 'UserService.setEmailValidity', `User email validity updated ${user.validity}`, Severity.INFO);
  }

  // private async publishMessage(userName: string) {
  //   const userNameBuffer = Buffer.from(JSON.stringify({ username: userName }));
  //   const userCreatedTopic = EnvConfiguration.USER_CREATED_TOPC;
  //   await publish(userNameBuffer, userCreatedTopic);
  // }
}
