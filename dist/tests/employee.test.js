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
const __1 = require("..");
const employee_service_1 = require("../services/employee.service");
const middlewares_1 = require("../middlewares");
const utils_1 = require("../utils");
jest.mock("..", () => ({
    prismaClient: {
        employee: {
            findUnique: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));
jest.mock("../utils", () => ({
    hashPassword: jest.fn(),
}));
let employeeService;
beforeEach(() => {
    employeeService = new employee_service_1.EmployeeService();
    jest.resetAllMocks();
});
describe("EmployeeService - addEmployee", () => {
    const mockPayload = {
        name: "John Doe",
        role: "EMPLOYEE",
        salary: 50000,
        department: "Engineering",
        joiningDate: "2023-01-01",
        email: "johndoe@mail.com",
    };
    it("should add an employee successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newEmployee = {
            id: "123",
            name: mockPayload.name,
            salary: mockPayload.salary,
            department: mockPayload.department,
            joiningDate: new Date(mockPayload.joiningDate),
            email: mockPayload.email,
        };
        const hashedPassword = "hashedPassword";
        const user = {
            id: "456",
            email: mockPayload.email,
            password: hashedPassword,
            role: mockPayload.role,
            employeeId: newEmployee.id,
        };
        __1.prismaClient.employee.findUnique.mockResolvedValueOnce(null);
        __1.prismaClient.employee.create.mockResolvedValueOnce(newEmployee);
        utils_1.hashPassword.mockResolvedValueOnce(hashedPassword);
        __1.prismaClient.user.create.mockResolvedValueOnce(user);
        const result = yield employeeService.addEmployee(mockPayload);
        expect(__1.prismaClient.employee.findUnique).toHaveBeenCalledWith({
            where: { email: mockPayload.email },
        });
        expect(__1.prismaClient.employee.create).toHaveBeenCalledWith({
            data: {
                name: mockPayload.name,
                salary: mockPayload.salary,
                department: mockPayload.department,
                joiningDate: new Date(mockPayload.joiningDate),
                email: mockPayload.email,
            },
        });
        expect(utils_1.hashPassword).toHaveBeenCalledWith("123456");
        expect(__1.prismaClient.user.create).toHaveBeenCalledWith({
            data: {
                email: mockPayload.email,
                password: hashedPassword,
                role: mockPayload.role,
                employeeId: newEmployee.id,
            },
        });
        expect(result).toEqual({
            message: "Employee added successfully",
            data: { employee: newEmployee, user },
        });
    }));
    it("should throw Conflict error if email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmployee = { id: "123", email: mockPayload.email };
        __1.prismaClient.employee.findUnique.mockResolvedValueOnce(existingEmployee);
        yield expect(employeeService.addEmployee(mockPayload)).rejects.toThrow(new middlewares_1.Conflict("Email already exist"));
        expect(__1.prismaClient.employee.findUnique).toHaveBeenCalledWith({
            where: { email: mockPayload.email },
        });
        expect(__1.prismaClient.employee.create).not.toHaveBeenCalled();
        expect(__1.prismaClient.user.create).not.toHaveBeenCalled();
    }));
    describe("EmployeeService - getAllEmployee", () => {
        it("should return a paginated list of employees", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockQuery = { page: 1, limit: 2 };
            const employees = [
                { id: "1", name: "John", email: "john@mail.com", user: {} },
                { id: "2", name: "Doe", email: "doe@mail.com", user: {} },
            ];
            __1.prismaClient.employee.findMany.mockResolvedValueOnce(employees);
            __1.prismaClient.employee.count.mockResolvedValueOnce(10);
            const result = yield employeeService.getAllEmployee(mockQuery);
            expect(__1.prismaClient.employee.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 2,
                include: { user: true },
            });
            expect(__1.prismaClient.employee.count).toHaveBeenCalled();
            expect(result).toEqual({
                message: "Employee records",
                data: employees,
                totalPages: 5,
            });
        }));
        it("should return a message if no employees exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockQuery = { page: 1, limit: 2 };
            __1.prismaClient.employee.findMany.mockResolvedValueOnce([]);
            __1.prismaClient.employee.count.mockResolvedValueOnce(0);
            const result = yield employeeService.getAllEmployee(mockQuery);
            expect(result).toEqual({
                message: "No employee has been added",
                data: [],
                totalPages: 0,
            });
        }));
    });
    describe("EmployeeService - updateEmployee", () => {
        const employeeId = "123";
        const mockPayload = {
            name: "Jane Doe",
            email: "janedoe@mail.com",
            salary: 60000,
            department: "HR",
            role: "ADMIN",
        };
        it("should update an employee's details successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = { id: "456", email: "john@mail.com", employeeId };
            __1.prismaClient.user.findUnique.mockResolvedValueOnce(existingUser);
            __1.prismaClient.employee.update.mockResolvedValueOnce(null);
            __1.prismaClient.user.update.mockResolvedValueOnce(null);
            const result = yield employeeService.updateEmployee(employeeId, mockPayload);
            expect(__1.prismaClient.employee.update).toHaveBeenCalledWith({
                where: { id: employeeId },
                data: {
                    name: mockPayload.name,
                    salary: mockPayload.salary,
                    department: mockPayload.department,
                    email: mockPayload.email,
                },
            });
            expect(__1.prismaClient.user.update).toHaveBeenCalledWith({
                where: { id: existingUser.id },
                data: {
                    email: mockPayload.email,
                    role: mockPayload.role,
                },
            });
            expect(result).toEqual({ message: "Record updated successfully" });
        }));
        it("should throw ResourceNotFound error if employee does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            __1.prismaClient.user.findUnique.mockResolvedValueOnce(null);
            yield expect(employeeService.updateEmployee(employeeId, mockPayload)).rejects.toThrow(new middlewares_1.ResourceNotFound("User not found"));
            expect(__1.prismaClient.employee.update).not.toHaveBeenCalled();
            expect(__1.prismaClient.user.update).not.toHaveBeenCalled();
        }));
        it("should throw Conflict error if email is already in use", () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = { id: "456", email: "john@mail.com", employeeId };
            const emailExists = { id: "789", email: mockPayload.email };
            __1.prismaClient.user.findUnique
                .mockResolvedValueOnce(existingUser)
                .mockResolvedValueOnce(emailExists);
            yield expect(employeeService.updateEmployee(employeeId, mockPayload)).rejects.toThrow(new middlewares_1.Conflict("Email is already in use by another user"));
            expect(__1.prismaClient.employee.update).not.toHaveBeenCalled();
            expect(__1.prismaClient.user.update).not.toHaveBeenCalled();
        }));
    });
    describe("EmployeeService - deleteEmployee", () => {
        const employeeId = "123";
        it("should delete an employee successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const existingUser = { id: "456", employeeId };
            __1.prismaClient.user.findUnique.mockResolvedValueOnce(existingUser);
            __1.prismaClient.user.delete.mockResolvedValueOnce(null);
            __1.prismaClient.employee.delete.mockResolvedValueOnce(null);
            const result = yield employeeService.deleteEmployee(employeeId);
            expect(__1.prismaClient.user.delete).toHaveBeenCalledWith({
                where: { id: existingUser.id },
            });
            expect(__1.prismaClient.employee.delete).toHaveBeenCalledWith({
                where: { id: employeeId },
            });
            expect(result).toEqual({ message: "Employee deleted successfully" });
        }));
        it("should throw ResourceNotFound error if employee does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            __1.prismaClient.user.findUnique.mockResolvedValueOnce(null);
            yield expect(employeeService.deleteEmployee(employeeId)).rejects.toThrow(new middlewares_1.ResourceNotFound("User not found"));
            expect(__1.prismaClient.user.delete).not.toHaveBeenCalled();
            expect(__1.prismaClient.employee.delete).not.toHaveBeenCalled();
        }));
    });
});
