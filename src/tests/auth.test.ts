import { AuthService } from "../services/auth.service";
import { prismaClient } from "..";
import {
  hashPassword,
  generateAccessToken,
  generateNumericOTP,
  comparePassword,
} from "../utils";
import { BadRequest } from "../middlewares";

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

    // Mock dependencies
    (prismaClient.user.findFirst as jest.Mock).mockResolvedValueOnce(null);
    (hashPassword as jest.Mock).mockResolvedValueOnce(mockHashedPassword);

    const mockUser = {
      id: 1,
      email: mockPayload.email,
    };
    (prismaClient.user.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const mockOtp = { token: "123456" };

    // Call the method
    const result = await authService.register(mockPayload);

    // Assertions
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
});
