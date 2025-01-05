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
const middlewares_1 = require("../middlewares");
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
        __1.prismaClient.user.findFirst.mockResolvedValueOnce(null);
        utils_1.hashPassword.mockResolvedValueOnce(mockHashedPassword);
        const mockUser = {
            id: 1,
            email: mockPayload.email,
        };
        __1.prismaClient.user.create.mockResolvedValueOnce(mockUser);
        const result = yield authService.register(mockPayload);
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
    it("should throw an error if user already exist ", () => __awaiter(void 0, void 0, void 0, function* () {
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
        __1.prismaClient.user.findFirst.mockResolvedValue(existingUser);
        yield expect(authService.register(mockPayload)).rejects.toThrow(new middlewares_1.Conflict("User already exists"));
        expect(__1.prismaClient.user.findFirst).toHaveBeenCalledWith({
            where: { email: mockPayload.email },
        });
    }));
});
describe("Authservice - login", () => {
    const mockpayload = {
        email: "user@mail.com",
        password: "1234",
    };
    it("should throw error if user doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        __1.prismaClient.user.findFirst.mockResolvedValueOnce(null);
        yield expect(authService.login(mockpayload)).rejects.toThrow(new middlewares_1.ResourceNotFound("Authentication failed"));
        expect(__1.prismaClient.user.findFirst).toHaveBeenCalledWith({
            where: { email: mockpayload.email },
        });
    }));
    it("should throw error when user exist but the password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = {
            id: 1,
            username: "adetayo",
            email: "user@mail.com",
            is_verified: true,
        };
        __1.prismaClient.user.findFirst.mockResolvedValueOnce(existingUser);
        utils_1.comparePassword.mockResolvedValueOnce(false);
        yield expect(authService.login(mockpayload)).rejects.toThrow(new middlewares_1.BadRequest("Authentication failed"));
        expect(__1.prismaClient.user.findFirst).toHaveBeenCalledWith({
            where: {
                email: mockpayload.email,
            },
        });
    }));
});
