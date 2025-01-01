import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import { addEmployee } from "../controllers/employee.controller";
import { EmployeeSchema } from "../schema/employee.schema";
const employeeRouter: Router = Router();

employeeRouter.post(
  "/",
  validateData(EmployeeSchema),
  authMiddleware,
  adminMiddleware,
  addEmployee
);

export { employeeRouter };
