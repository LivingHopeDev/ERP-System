import { prismaClient } from "..";

export class DashboardService {
  public async countEmployees() {
    const totalEmployees = await prismaClient.employee.count();
    const employeesPerDepartmentArray = await prismaClient.employee.groupBy({
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
  }
}
