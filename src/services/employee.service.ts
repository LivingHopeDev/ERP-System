import { prismaClient } from "..";
import { IEmployee } from "../types";
import { Role } from "@prisma/client";
export class EmployeeService {
  public async addEmployee(
    payload: IEmployee
  ): Promise<{ message: string; data: any }> {
    const { name, role, salary, department, joiningDate, email } = payload;

    const newEmployee = await prismaClient.employee.create({
      data: {
        name,
        salary,
        department,
        joiningDate,
        email,
      },
    });

    const user = await prismaClient.user.create({
      data: {
        email,
        role: role as Role,
        employeeId: newEmployee.id,
      },
    });

    return {
      message: "Employee created successfully",
      data: { employee: newEmployee, user },
    };
  }
}
