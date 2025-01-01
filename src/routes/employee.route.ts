import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import {
  addEmployee,
  getAllEmployee,
} from "../controllers/employee.controller";
import { EmployeeSchema } from "../schema/employee.schema";
const employeeRouter: Router = Router();

employeeRouter.post(
  "/",
  validateData(EmployeeSchema),
  authMiddleware,
  adminMiddleware,
  addEmployee
);

employeeRouter.get("/", authMiddleware, adminMiddleware, getAllEmployee);
export { employeeRouter };
