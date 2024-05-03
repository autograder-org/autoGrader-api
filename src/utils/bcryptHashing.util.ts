import bcrypt from "bcrypt";
import { Buffer } from "buffer";
import { EnvConfiguration } from "../config/env.config.js";
import { setEmail } from "../controllers/types/EmailT.js";
import { BadInputError } from "../errorHandling/Errors.js";

// Function to hash the password and encode it in Base64
export async function hashPasswordAndEncode(
  emailId: string,
  password: string
): Promise<string> {
  try {
    setEmail(emailId);
  } catch (err) {
    throw new BadInputError("Invalid email id provided");
  }

  const saltRounds = 10; // You can adjust the salt rounds as needed

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);

    const passwordToStore = emailId + ":" + password;

    const hashedPassword = await bcrypt.hash(passwordToStore, salt);

    // // Convert the hashed password to Base64
    // const base64EncodedPassword =
    //   Buffer.from(hashedPassword).toString("base64");

    return hashedPassword;
  } catch (error) {
    throw error; // Rethrow or handle the error appropriately
  }
}

// Example usage
// const emailId = 'user@example.com';
// const password = 'SecureP@ssw0rd!';

// hashPasswordAndEncode(emailId, password)
//   .then(encodedPassword => {
//     console.log('Encoded Password:', encodedPassword);
//     // Proceed to save the emailId and encodedPassword to your database
//   })
//   .catch(error => {
//     console.error(error);
//   });
