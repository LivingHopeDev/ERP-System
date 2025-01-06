import { prismaClient } from "..";
import { EmployeeService } from "../services/employee.service";
import { Conflict, ResourceNotFound } from "../middlewares";
import { hashPassword } from "../utils";

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

let employeeService: EmployeeService;

beforeEach(() => {
  employeeService = new EmployeeService();
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

  it("should add an employee successfully", async () => {
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

    (prismaClient.employee.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prismaClient.employee.create as jest.Mock).mockResolvedValueOnce(
      newEmployee
    );
    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);
    (prismaClient.user.create as jest.Mock).mockResolvedValueOnce(user);

    const result = await employeeService.addEmployee(mockPayload);

    expect(prismaClient.employee.findUnique as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
    expect(prismaClient.employee.create as jest.Mock).toHaveBeenCalledWith({
      data: {
        name: mockPayload.name,
        salary: mockPayload.salary,
        department: mockPayload.department,
        joiningDate: new Date(mockPayload.joiningDate),
        email: mockPayload.email,
      },
    });
    expect(hashPassword as jest.Mock).toHaveBeenCalledWith("123456");
    expect(prismaClient.user.create as jest.Mock).toHaveBeenCalledWith({
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
  });

  it("should throw Conflict error if email already exists", async () => {
    const existingEmployee = { id: "123", email: mockPayload.email };
    (prismaClient.employee.findUnique as jest.Mock).mockResolvedValueOnce(
      existingEmployee
    );

    await expect(employeeService.addEmployee(mockPayload)).rejects.toThrow(
      new Conflict("Email already exist")
    );

    expect(prismaClient.employee.findUnique as jest.Mock).toHaveBeenCalledWith({
      where: { email: mockPayload.email },
    });
    expect(prismaClient.employee.create as jest.Mock).not.toHaveBeenCalled();
    expect(prismaClient.user.create as jest.Mock).not.toHaveBeenCalled();
  });

  describe("EmployeeService - getAllEmployee", () => {
    it("should return a paginated list of employees", async () => {
      const mockQuery = { page: 1, limit: 2 };
      const employees = [
        { id: "1", name: "John", email: "john@mail.com", user: {} },
        { id: "2", name: "Doe", email: "doe@mail.com", user: {} },
      ];

      (prismaClient.employee.findMany as jest.Mock).mockResolvedValueOnce(
        employees
      );
      (prismaClient.employee.count as jest.Mock).mockResolvedValueOnce(10);

      const result = await employeeService.getAllEmployee(mockQuery);

      expect(prismaClient.employee.findMany as jest.Mock).toHaveBeenCalledWith({
        skip: 0,
        take: 2,
        include: { user: true },
      });
      expect(prismaClient.employee.count as jest.Mock).toHaveBeenCalled();
      expect(result).toEqual({
        message: "Employee records",
        data: employees,
        totalPages: 5,
      });
    });

    it("should return a message if no employees exist", async () => {
      const mockQuery = { page: 1, limit: 2 };
      (prismaClient.employee.findMany as jest.Mock).mockResolvedValueOnce([]);
      (prismaClient.employee.count as jest.Mock).mockResolvedValueOnce(0);

      const result = await employeeService.getAllEmployee(mockQuery);

      expect(result).toEqual({
        message: "No employee has been added",
        data: [],
        totalPages: 0,
      });
    });
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

    it("should update an employee's details successfully", async () => {
      const existingUser = { id: "456", email: "john@mail.com", employeeId };

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(
        existingUser
      );
      (prismaClient.employee.update as jest.Mock).mockResolvedValueOnce(null);
      (prismaClient.user.update as jest.Mock).mockResolvedValueOnce(null);

      const result = await employeeService.updateEmployee(
        employeeId,
        mockPayload
      );

      expect(prismaClient.employee.update as jest.Mock).toHaveBeenCalledWith({
        where: { id: employeeId },
        data: {
          name: mockPayload.name,
          salary: mockPayload.salary,
          department: mockPayload.department,
          email: mockPayload.email,
        },
      });

      expect(prismaClient.user.update as jest.Mock).toHaveBeenCalledWith({
        where: { id: existingUser.id },
        data: {
          email: mockPayload.email,
          role: mockPayload.role,
        },
      });

      expect(result).toEqual({ message: "Record updated successfully" });
    });

    it("should throw ResourceNotFound error if employee does not exist", async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        employeeService.updateEmployee(employeeId, mockPayload)
      ).rejects.toThrow(new ResourceNotFound("User not found"));

      expect(prismaClient.employee.update as jest.Mock).not.toHaveBeenCalled();
      expect(prismaClient.user.update as jest.Mock).not.toHaveBeenCalled();
    });

    it("should throw Conflict error if email is already in use", async () => {
      const existingUser = { id: "456", email: "john@mail.com", employeeId };
      const emailExists = { id: "789", email: mockPayload.email };

      (prismaClient.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(existingUser)
        .mockResolvedValueOnce(emailExists);

      await expect(
        employeeService.updateEmployee(employeeId, mockPayload)
      ).rejects.toThrow(
        new Conflict("Email is already in use by another user")
      );

      expect(prismaClient.employee.update as jest.Mock).not.toHaveBeenCalled();
      expect(prismaClient.user.update as jest.Mock).not.toHaveBeenCalled();
    });
  });
  describe("EmployeeService - deleteEmployee", () => {
    const employeeId = "123";

    it("should delete an employee successfully", async () => {
      const existingUser = { id: "456", employeeId };

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(
        existingUser
      );
      (prismaClient.user.delete as jest.Mock).mockResolvedValueOnce(null);
      (prismaClient.employee.delete as jest.Mock).mockResolvedValueOnce(null);

      const result = await employeeService.deleteEmployee(employeeId);

      expect(prismaClient.user.delete as jest.Mock).toHaveBeenCalledWith({
        where: { id: existingUser.id },
      });
      expect(prismaClient.employee.delete as jest.Mock).toHaveBeenCalledWith({
        where: { id: employeeId },
      });
      expect(result).toEqual({ message: "Employee deleted successfully" });
    });

    it("should throw ResourceNotFound error if employee does not exist", async () => {
      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await expect(employeeService.deleteEmployee(employeeId)).rejects.toThrow(
        new ResourceNotFound("User not found")
      );

      expect(prismaClient.user.delete as jest.Mock).not.toHaveBeenCalled();
      expect(prismaClient.employee.delete as jest.Mock).not.toHaveBeenCalled();
    });
  });
});
