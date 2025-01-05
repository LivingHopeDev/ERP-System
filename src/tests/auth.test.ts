import { AuthService } from "../services/auth.service";
import { prismaClient } from "..";
import {
  hashPassword,
  generateAccessToken,
  generateNumericOTP,
  comparePassword,
} from "../utils";
import {
  BadRequest,
  Conflict,
  ResourceNotFound,
  Unauthorised,
} from "../middlewares";

jest.mock("../utils");
jest.mock("..", () => ({
  prismaClient: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

let authService: AuthService;

beforeEach(() => {
  authService = new AuthService();
  jest.resetAllMocks();
});
describe("AuthService - signup", () => {
  it("should create a user ", async () => {
    const mockPayload = {
      email: "user@mail.com",
      password: "1234",
    };
    const mockHashedPassword = "hashedpassword";

    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(null);
    (hashPassword as jest.Mock).mockResolvedValueOnce(mockHashedPassword);

    const mockUser = {
      id: 1,
      email: mockPayload.email,
    };
    (prismaClient.user.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await authService.register(mockPayload);

    expect(prismaClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith({
      data: {
        email: mockPayload.email,
        password: mockHashedPassword,
      },
    });

    expect(result).toEqual({
      data: {
        id: mockUser.id,
        email: mockUser.email,
      },
      message: "User Created Successfully.",
    });
  });

  it("should throw an error if user already exist ", async () => {
    const mockPayload = {
      email: "user@mail.com",
      username: "adetayo",
      password: "1234",
    };

    const existingUser = {
      id: 1,
      username: "adetayo",
      email: "user@mail.com",
      password: "hashedpassword",
    };

    (prismaClient.user.findFirst as jest.Mock).mockResolvedValue(existingUser);
    await expect(authService.register(mockPayload)).rejects.toThrow(
      new Conflict("User already exists")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
  });
});

describe("Authservice - login", () => {
  const mockpayload = {
    email: "user@mail.com",
    password: "1234",
  };
  it("should throw error if user doesn't exist", async () => {
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(null);

    await expect(authService.login(mockpayload)).rejects.toThrow(
      new ResourceNotFound("Authentication failed")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockpayload.email },
    });
  });

  it("should throw error when user exist but the password is wrong", async () => {
    const existingUser = {
      id: 1,
      username: "adetayo",
      email: "user@mail.com",
      is_verified: true,
    };
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(
      existingUser
    );
    (comparePassword as jest.Mock).mockResolvedValueOnce(false);
    await expect(authService.login(mockpayload)).rejects.toThrow(
      new BadRequest("Authentication failed")
    );
    expect(prismaClient.user.findFirst as jest.Mock).toHaveBeenCalledWith({
      where: {
        email: mockpayload.email,
      },
    });
  });
});
