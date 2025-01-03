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
exports.EmployeeService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
const utils_1 = require("../utils");
class EmployeeService {
    addEmployee(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, role, salary, department, joiningDate, email } = payload;
            const emailExist = yield __1.prismaClient.employee.findUnique({
                where: { email },
            });
            if (emailExist) {
                throw new middlewares_1.Conflict("Email already exist");
            }
            const newEmployee = yield __1.prismaClient.employee.create({
                data: {
                    name,
                    salary,
                    department,
                    joiningDate: new Date(joiningDate),
                    email,
                },
            });
            // Create a User record for the employee for login purposes
            // Use a default password for employee; they can change it when they want.
            const defaultPassword = "123456";
            const hashedPassword = yield (0, utils_1.hashPassword)(defaultPassword);
            const user = yield __1.prismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: role,
                    employeeId: newEmployee.id,
                },
            });
            return {
                message: "Employee added successfully",
                data: { employee: newEmployee, user },
            };
        });
    }
    getAllEmployee(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10 } = query;
            const [employees, totalRecords] = yield Promise.all([
                __1.prismaClient.employee.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        user: true,
                    },
                }),
                __1.prismaClient.employee.count(),
            ]);
            const totalPages = Math.ceil(totalRecords / limit);
            if (employees.length === 0) {
                return {
                    message: "No employee has been added",
                    data: employees,
                    totalPages,
                };
            }
            return { message: "Employee records", data: employees, totalPages };
        });
    }
    updateEmployee(employeeId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, salary, department, email, role } = payload;
            const userExist = yield __1.prismaClient.user.findUnique({
                where: {
                    employeeId,
                },
            });
            if (!userExist) {
                throw new middlewares_1.ResourceNotFound("User not found");
            }
            if (email && email !== userExist.email) {
                const emailExists = yield __1.prismaClient.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (emailExists) {
                    throw new middlewares_1.Conflict("Email is already in use by another user");
                }
            }
            yield __1.prismaClient.employee.update({
                where: { id: employeeId },
                data: {
                    name,
                    salary,
                    department,
                    email,
                },
            });
            yield __1.prismaClient.user.update({
                where: { id: userExist.id },
                data: {
                    email,
                    role: role,
                },
            });
            return {
                message: "Record updated successfully",
            };
        });
    }
    deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield __1.prismaClient.user.findUnique({
                where: { employeeId },
            });
            if (!userExist) {
                throw new middlewares_1.ResourceNotFound("User not found");
            }
            yield __1.prismaClient.user.delete({
                where: { id: userExist.id },
            });
            yield __1.prismaClient.employee.delete({
                where: { id: employeeId },
            });
            return { message: "Employee deleted successfully" };
        });
    }
}
exports.EmployeeService = EmployeeService;
