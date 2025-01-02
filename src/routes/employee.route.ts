import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from "../controllers/employee.controller";
import {
  EmployeeSchema,
  updateEmployeeSchema,
} from "../schema/employee.schema";
const employeeRouter: Router = Router();

employeeRouter.post(
  "/",
  validateData(EmployeeSchema),
  authMiddleware,
  adminMiddleware,
  addEmployee
);

employeeRouter.get("/", authMiddleware, adminMiddleware, getAllEmployee);
employeeRouter.patch(
  "/:id",
  validateData(updateEmployeeSchema),
  authMiddleware,
  adminMiddleware,
  updateEmployee
);
employeeRouter.delete("/:id", authMiddleware, adminMiddleware, deleteEmployee);
export { employeeRouter };
