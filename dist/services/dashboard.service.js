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
exports.DashboardService = void 0;
const __1 = require("..");
class DashboardService {
    countEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalEmployees = yield __1.prismaClient.employee.count();
            const employeesPerDepartmentArray = yield __1.prismaClient.employee.groupBy({
                by: "department",
                _count: { department: true },
            });
            const employeesPerDepartment = employeesPerDepartmentArray.map((emp) => ({
                count: emp._count.department,
                department: emp.department,
            }));
            return {
                data: { totalEmployees, employeesPerDepartment },
            };
        });
    }
}
exports.DashboardService = DashboardService;
