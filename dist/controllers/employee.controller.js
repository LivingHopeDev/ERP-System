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
exports.deleteEmployee = exports.updateEmployee = exports.getAllEmployee = exports.addEmployee = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const employee_service_1 = require("../services/employee.service");
const employeeService = new employee_service_1.EmployeeService();
exports.addEmployee = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, data } = yield employeeService.addEmployee(req.body);
    res.status(201).json({ message, data });
}));
exports.getAllEmployee = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const { message, data, totalPages } = yield employeeService.getAllEmployee({
        page: page ? parseInt(page) : undefined,
        limit: limit ? parseInt(limit) : undefined,
    });
    res
        .status(200)
        .json({ message, data, totalPages, page: page || 1, limit: limit || 10 });
}));
exports.updateEmployee = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = yield employeeService.updateEmployee(id, req.body);
    res.status(200).json({ message });
}));
exports.deleteEmployee = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = yield employeeService.deleteEmployee(id);
    res.status(200).json({ message });
}));
