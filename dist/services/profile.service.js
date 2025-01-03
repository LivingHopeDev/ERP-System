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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
class ProfileService {
    viewProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield __1.prismaClient.user.findUnique({
                where: { id: userId },
                include: { employee: true },
            });
            if (!userExist) {
                throw new middlewares_1.ResourceNotFound("User not found");
            }
            const { password } = userExist, others = __rest(userExist, ["password"]);
            return {
                data: others,
            };
        });
    }
    updateProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, department, joiningDate } = payload;
            const userExist = yield __1.prismaClient.user.findUnique({
                where: { id: userId },
                include: { employee: true },
            });
            if (!userExist) {
                throw new middlewares_1.ResourceNotFound("User not found");
            }
            yield __1.prismaClient.user.update({
                where: { id: userId },
                data: {
                    email,
                },
            });
            yield __1.prismaClient.employee.update({
                where: { id: userExist.employeeId },
                data: {
                    name,
                    email,
                    department,
                    joiningDate: new Date(joiningDate),
                },
            });
            return {
                message: "Profile updated",
            };
        });
    }
}
exports.ProfileService = ProfileService;
