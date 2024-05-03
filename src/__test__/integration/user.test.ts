import supertest from "supertest";
import { encodeCredentialsToBase64 } from "../../utils/base64.util";
import { connectDB } from "../../utils/dbConnectivity.util";

import createApp from "../../app";
import { AppDataSource } from "../../config/database.config";
import { DBConnection, User } from "../../entities";
import { SetEmailValidity } from "../../controllers/requestModels/SetEmailValidity";
import { EnvConfiguration } from "../../config/env.config";

const app = createApp();

beforeAll(async () => {
  let isDbConnected = await connectDB();

  while (!isDbConnected) {
    isDbConnected = await connectDB();
  }
});

describe("user", () => {
  beforeEach(async () => {
    await User.clear();
  });
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 401 response code", async () => {
        const username = "user123@gmail.com";
        const password = "test123";

        const basicAuthToken = encodeCredentialsToBase64(username, password);

        await supertest(app)
          .get("/v5/user/self")
          .set("Authorization", `Basic ${basicAuthToken}`)
          .expect(401);
      });
    });

    describe("given the user exists", () => {
      describe("given user email is verified", () => {
        it("should return a 200", async () => {
          const payload = {
            username: "testNew4@northeastern.edu",
            password: "testPass3",
            first_name: "Arun",
            last_name: "Balaji",
          };

          await supertest(app)
            .post("/v5/user")
            .send(payload)
            .set("Content-Type", "application/json");

          await validateUserEmailId(payload.username);

          const basicAuthToken = encodeCredentialsToBase64(
            payload.username,
            payload.password
          );

          await supertest(app)
            .get("/v5/user/self")
            .set("Authorization", `Basic ${basicAuthToken}`)
            .expect(200);
        });
      });

      describe("given the user email id is not validated", () => {
        it("should return a 403", async () => {
          const payload = {
            username: "testNew4@northeastern.edu",
            password: "testPass3",
            first_name: "Arun",
            last_name: "Balaji",
          };

          await supertest(app)
            .post("/v5/user")
            .send(payload)
            .set("Content-Type", "application/json");

          const basicAuthToken = encodeCredentialsToBase64(
            payload.username,
            payload.password
          );

          await supertest(app)
            .get("/v5/user/self")
            .set("Authorization", `Basic ${basicAuthToken}`)
            .expect(403);
        });
      });
    });
  });

  describe("post user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 201", async () => {
        const payload = {
          username: "testNew4@northeastern.edu",
          password: "testPass3",
          first_name: "Arun",
          last_name: "Balaji",
        };

        await supertest(app)
          .post("/v5/user")
          .send(payload)
          .set("Content-Type", "application/json")
          .expect(201);
      });
    });
  });

  describe("update user route", () => {
    describe("given the user was created", () => {
      describe("given user email id was validated", () => {
        it("shuould return a 204", async () => {
          // first create the user
          const payload = {
            username: "testNew4@northeastern.edu",
            password: "testPass3",
            first_name: "Arun",
            last_name: "Balaji",
          };

          await supertest(app)
            .post("/v5/user")
            .send(payload)
            .set("Content-Type", "application/json");

          // getting the user's email id validated
          await validateUserEmailId(payload.username);

          // update the user
          const updatePayload = {
            password: "testPass345",
            first_name: "Varun",
            last_name: "Anand",
          };

          const basicAuthToken = encodeCredentialsToBase64(
            payload.username,
            payload.password
          );

          const { body } = await supertest(app)
            .put("/v5/user/self")
            .send(updatePayload)
            .set("Authorization", `Basic ${basicAuthToken}`)
            .expect(204);
        });
      });

      describe("given user email id was not validated", () => {
        it("shuould return a 403", async () => {
          // first create the user
          const payload = {
            username: "testNew4@northeastern.edu",
            password: "testPass3",
            first_name: "Arun",
            last_name: "Balaji",
          };

          await supertest(app)
            .post("/v5/user")
            .send(payload)
            .set("Content-Type", "application/json");

          // update the user
          const updatePayload = {
            password: "testPass345",
            first_name: "Varun",
            last_name: "Anand",
          };

          const basicAuthToken = encodeCredentialsToBase64(
            payload.username,
            payload.password
          );

          const { body } = await supertest(app)
            .put("/v5/user/self")
            .send(updatePayload)
            .set("Authorization", `Basic ${basicAuthToken}`)
            .expect(403);
        });
      });
    });
  });
});

afterAll(async () => {
  await DBConnection.clear();
  await AppDataSource.destroy();
});

/**
 * This function can be called in all places where we want a user email validation
 * to happen
 */
const validateUserEmailId = async (username: string) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + EnvConfiguration.EMAIL_VALIDITY_MINUTES);

  const validityPayload: SetEmailValidity = {
    username,
    validUpto: date,
  };
  // set the email validity of the user
  // await supertest(app).put("/v5/user/setValidity").send(validityPayload);

  // get the user
  const user = await User.findOneBy({
    username,
  });

  if (!user) {
    throw Error();
  }

  //  here we manually set the validity value,
  // the payload and the random generated token and we return that
  const randomToken = crypto.randomUUID();
  user.validity = date;
  user.validityToken = randomToken;
  await user.save();

  // Validate the user's email as well
  await supertest(app).get("/v5/user/verifyEmail").query({
    username,
    validityToken: randomToken,
  });
};
