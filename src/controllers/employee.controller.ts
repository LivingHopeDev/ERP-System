import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { EmployeeService } from "../services/employee.service";

const employeeService = new EmployeeService();

export const addEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { message, data } = await employeeService.addEmployee(req.body);
  res.status(201).json({ message, data });
});
