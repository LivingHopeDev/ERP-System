"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const __1 = require("..");
const utils_1 = require("../utils");
jest.mock("../utils");
jest.mock("..", () => ({
    prismaClient: {
        user: {
            findFirst: jest.fn(),
            create: jest.fn(),
        },
    },
}));
let authService;
beforeEach(() => {
    authService = new auth_service_1.AuthService();
    jest.resetAllMocks();
});
describe("AuthService - signup", () => {
    it("should create a user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPayload = {
            email: "user@mail.com",
            password: "1234",
        };
        const mockHashedPassword = "hashedpassword";
        // Mock dependencies
        __1.prismaClient.user.findFirst.mockResolvedValueOnce(null);
        utils_1.hashPassword.mockResolvedValueOnce(mockHashedPassword);
        const mockUser = {
            id: 1,
            email: mockPayload.email,
        };
        __1.prismaClient.user.create.mockResolvedValueOnce(mockUser);
        const mockOtp = { token: "123456" };
        // Call the method
        const result = yield authService.register(mockPayload);
        // Assertions
        expect(__1.prismaClient.user.findFirst).toHaveBeenCalledWith({
            where: { email: mockPayload.email },
        });
        expect(__1.prismaClient.user.create).toHaveBeenCalledWith({
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
    }));
});
