"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const employee_controller_1 = require("../controllers/employee.controller");
const employee_schema_1 = require("../schema/employee.schema");
const employeeRouter = (0, express_1.Router)();
exports.employeeRouter = employeeRouter;
employeeRouter.post("/", (0, middlewares_1.validateData)(employee_schema_1.EmployeeSchema), middlewares_1.authMiddleware, middlewares_1.adminMiddleware, employee_controller_1.addEmployee);
employeeRouter.get("/", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, employee_controller_1.getAllEmployee);
employeeRouter.patch("/:id", (0, middlewares_1.validateData)(employee_schema_1.updateEmployeeSchema), middlewares_1.authMiddleware, middlewares_1.adminMiddleware, employee_controller_1.updateEmployee);
employeeRouter.delete("/:id", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, employee_controller_1.deleteEmployee);
