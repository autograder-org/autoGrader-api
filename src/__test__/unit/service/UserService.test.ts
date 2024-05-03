import { FindManyOptions } from "typeorm";
import { UpdateUserAccount } from "../../../controllers/requestModels/UpdateUserAccount";
import { User } from "../../../entities/User";
import {
  AuthError,
  BadInputError,
  BadRequestError,
} from "../../../errorHandling/Errors";
import UserService from "../../../service/UserService";
import {
  mockCreate,
  mockSave,
  mockFind,
  mockFindBy,
  mockFindOneBy,
  mockCreateQueryBuilder,
  mockFindAndCount,
} from "../../TypeORMMocks";

jest.mock("../../../entities/User", () => {
  return {
    User: {
      // Mock static methods directly
      create: (u: User) => mockCreate(u),
      save: (u: User) => mockSave(u),
      find: (u: FindManyOptions<User>) => mockFind(u),
      findBy: (u: User) => mockFindBy(u),
      findOneBy: (u: User) => mockFindOneBy(u),
      createQueryBuilder: () => mockCreateQueryBuilder(),
      findAndCount: (o: FindManyOptions<User>) => mockFindAndCount(o),
    },
  };
});

describe("User Service", () => {
  describe("Create user", () => {
    let userService: UserService;
    const mockFindUser = jest.fn();
    const mockFindOneByUser = jest.fn();
    beforeEach(() => {
      userService = new UserService();
      mockFindUser.mockReset();
      mockFindOneByUser.mockReset();
      User.find = mockFindUser;
      User.findOneBy = mockFindOneByUser;
    });

    // set up
    const newUserDetails = {
      username: "test@gmail.com",
      first_name: "John",
      last_name: "Doe",
      password: "test123",
    };

    const existingUsersWithoutNewUser: User[] = [
      User.create({
        username: "test2@gmail.com",
        first_name: "John2",
        last_name: "Doe2",
        password: "test1232",
      }),
      User.create({
        username: "test3@gmail.com",
        first_name: "John3",
        last_name: "Doe3",
        password: "$$$RRR",
      }),
    ];


    it("Should throw a BadInput Error when an invalid email is passed in", async () => {
      const userDetails = Object.assign({}, newUserDetails);
      userDetails.username = "3b87624fyfv44.dcjb.com";
      await expect(userService.createUser(userDetails)).rejects.toThrow(
        new BadInputError("Invalid email provided " + userDetails.username)
      );
    });

    it("Should throw a BadRequest Error when a user account with the email address already exists", async () => {
      // Set up
      const userDetails = Object.assign({}, newUserDetails);

      const { username, first_name, last_name, password } = userDetails;

      const existingUser = User.create();
      existingUser.username = username;
      existingUser.first_name = first_name;
      existingUser.last_name = last_name;
      existingUser.password = password;

      mockFindOneByUser.mockResolvedValueOnce(existingUser);

      // Act and expect
      await expect(userService.createUser(userDetails)).rejects.toThrow(
        new BadRequestError(
          "User with email id " + userDetails.username + " already exists."
        )
      );
    });
  });

  describe("Update user", () => {
    let userService: UserService;
    const mockFindUser = jest.fn();
    const mockFindOneByUser = jest.fn();
    beforeEach(() => {
      userService = new UserService();
      mockFindUser.mockReset();
      mockFindOneByUser.mockReset();
      User.find = mockFindUser;
      User.findOneBy = mockFindOneByUser;
    });

    it("Should throw an Auth error when an empty user name is passed in", async () => {
      await expect(
        userService.updateUser({} as UpdateUserAccount, "")
      ).rejects.toThrow(new AuthError("Unauthenticated user"));

      await expect(
        userService.updateUser({} as UpdateUserAccount, undefined)
      ).rejects.toThrow(new AuthError("Unauthenticated user"));
    });

    it("Should throw a BadInputError if none of the required properties are sent in for an update", async () => {

      const updateInfo = {
      } as UpdateUserAccount;

      await expect(
        userService.updateUser(updateInfo, "test@gmail.com")
      ).rejects.toThrow(
        new BadInputError(
          "At least one property must be provided to update the user account."
        )
      );
    });

    it("Should throw an Auth error if the user does not exist in the database", async () => {

      const updateInfo = {
        password: "newPassword",
        firstName: "newFirstName",
        lastName: "newLastName"
      } as UpdateUserAccount;

      mockFindOneByUser.mockResolvedValueOnce(null);

      await expect(
        userService.updateUser(updateInfo, "test@gmail.com")
      ).rejects.toThrow(new AuthError("Unauthenticated user"));
    });
  });

  describe("Get user", () => {
    let userService: UserService;
    const mockFindUser = jest.fn();
    const mockFindOneByUser = jest.fn();
    beforeEach(() => {
      userService = new UserService();
      mockFindUser.mockReset();
      mockFindOneByUser.mockReset();
      User.find = mockFindUser;
      User.findOneBy = mockFindOneByUser;
    });

    it("Should throw an Auth Error when username is undefined or not a valid email id", async () => {
      await expect(userService.getUser(undefined)).rejects.toThrow(
        new AuthError("Unauthenticated user")
      );

      await expect(userService.getUser("")).rejects.toThrow(
        new AuthError("Unauthenticated user")
      );

      await expect(
        userService.getUser("invalid-Email-ID.4r432432@hcccwecb.com")
      ).rejects.toThrow(new AuthError("Unauthenticated user"));
    });
    it("Should throw an Auth Error when user is not found in the db", async () => {
      mockFindOneByUser.mockResolvedValueOnce(null);

      await expect(userService.getUser("test@gmail.com")).rejects.toThrow(
        new AuthError("Unauthenticated user")
      );
    });
  });
});
