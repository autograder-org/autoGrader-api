import { FindManyOptions } from "typeorm";
import { HealthCheckController } from "../../../controllers/HealthCheck.controller";
import { DBConnection } from "../../../entities/DBConnection";
import {
  mockCreate,
  mockCreateQueryBuilder,
  mockFind,
  mockFindAndCount,
  mockFindBy,
  mockFindOneBy,
  mockSave,
} from "../../TypeORMMocks";

// Assuming HealthCheckController has a method that directly uses DBConnection
jest.mock("../../../entities/DBConnection", () => {
  return {
    DBConnection: {
      // Mock static methods directly
      create: (u: DBConnection) => mockCreate(u),
      save: (u: DBConnection) => mockSave(u),
      find: (u: FindManyOptions<DBConnection>) => mockFind(u),
      findBy: (u: DBConnection) => mockFindBy(u),
      findOneBy: (u: DBConnection) => mockFindOneBy(u),
      createQueryBuilder: () => mockCreateQueryBuilder(),
      findAndCount: (o: FindManyOptions<DBConnection>) => mockFindAndCount(o),
    },
  };
});

describe("Testing the health check controller", () => {
  let healthCheckController: HealthCheckController;
  const mockDBFind = jest.fn();

  beforeAll(() => {
    healthCheckController = new HealthCheckController();
    mockDBFind.mockReset();
    DBConnection.find = mockDBFind;
  });

  it("Should return a 200 response code when able to connect to the DB", async () => {
    // Set up
    const mockDbConnection = DBConnection.create({ i: 0 });
    mockDBFind.mockResolvedValue([mockDbConnection]);

    // Execute
    await healthCheckController.checkConnection();

    // Assert
    expect(healthCheckController.getStatus()).toBe(200);
  });

  it("Should return a 503 response code when not able to connect to the DB", async () => {
    // Set up
    // const mockDbConnection = DBConnection.create({ i: 0 });
    mockDBFind.mockResolvedValue(null);

    // Execute
    await healthCheckController.checkConnection();

    // Assert
    expect(healthCheckController.getStatus()).toBe(503);
  });
});
