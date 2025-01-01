import { prismaClient } from "..";
import { Conflict, ResourceNotFound } from "../middlewares";
import { IEmployee } from "../types";
import { Employee, Role } from "@prisma/client";
export class EmployeeService {
  public async addEmployee(
    payload: IEmployee
  ): Promise<{ message: string; data: any }> {
    const { name, role, salary, department, joiningDate, email } = payload;
    const emailExist = await prismaClient.employee.findUnique({
      where: { email },
    });
    if (emailExist) {
      throw new Conflict("Email already exist");
    }
    const newEmployee = await prismaClient.employee.create({
      data: {
        name,
        salary,
        department,
        joiningDate: new Date(joiningDate),
        email,
      },
    });
    // Create a User record for the employee for login purposes
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

  public async getAllEmployee(query: {
    page: number;
    limit: number;
  }): Promise<{ message: string; data: Employee[]; totalPages: number }> {
    const { page = 1, limit = 10 } = query;
    const [employees, totalRecords] = await Promise.all([
      prismaClient.employee.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true,
        },
      }),
      prismaClient.employee.count(),
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
  }
  public async updateEmployee(
    employeeId: string,
    payload: Partial<IEmployee>
  ): Promise<{ message: string }> {
    const { name, salary, department, email, role } = payload;
    const userExist = await prismaClient.user.findUnique({
      where: {
        employeeId,
      },
    });
    if (!userExist) {
      throw new ResourceNotFound("User not found");
    }
    await prismaClient.employee.update({
      where: { id: employeeId },
      data: {
        name,
        salary,
        department,
        email,
      },
    });
    await prismaClient.user.update({
      where: { id: userExist.id },
      data: {
        email,
        role: role as Role,
      },
    });

    return {
      message: "Record updated",
    };
  }


