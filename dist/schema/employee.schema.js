"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.EmployeeSchema = void 0;
const zod_1 = require("zod");
exports.EmployeeSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    department: zod_1.z.string(),
    role: zod_1.z.enum(["employee", "admin"]).optional(),
    salary: zod_1.z.number().positive("Salary must be a positive number"),
    joiningDate: zod_1.z.string(),
});
exports.updateEmployeeSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    name: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    role: zod_1.z.enum(["employee", "admin"]).optional(),
    salary: zod_1.z.number().positive("Salary must be a positive number").optional(),
    joiningDate: zod_1.z.string().optional(),
});
