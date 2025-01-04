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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../config"));
const __1 = require("..");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
class AuthService {
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const hashedPassword = yield (0, utils_1.hashPassword)(password);
            let user = yield __1.prismaClient.user.findFirst({ where: { email } });
            if (user) {
                throw new middlewares_1.Conflict("User already exists");
            }
            const newUser = yield __1.prismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
            return {
                data: newUser,
                message: "User Created Successfully.",
            };
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const userExist = yield __1.prismaClient.user.findFirst({ where: { email } });
            if (!userExist) {
                throw new middlewares_1.ResourceNotFound("Authentication failed");
            }
            const isPassword = yield (0, utils_1.comparePassword)(password, userExist.password);
            if (!isPassword) {
                throw new middlewares_1.ResourceNotFound("Authentication failed");
            }
            const accessToken = yield (0, utils_1.generateAccessToken)(userExist.id);
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + parseInt(config_1.default.TOKEN_EXPIRY.replace("d", ""), 10));
            yield __1.prismaClient.session.upsert({
                where: { userId: userExist.id },
                update: { sessionToken: accessToken, expiresAt },
                create: { userId: userExist.id, sessionToken: accessToken, expiresAt },
            });
            const user = {
                email: userExist.email,
                role: userExist.role,
            };
            return {
                message: "Login Successfully",
                user,
                token: accessToken,
            };
        });
    }
    logout(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield __1.prismaClient.session.delete({
                where: { userId, sessionToken: token },
            });
            return {
                message: "Logout sucessful",
            };
        });
    }
}
exports.AuthService = AuthService;
