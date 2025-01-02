import { Router } from "express";
import { authMiddleware, adminMiddleware, validateData } from "../middlewares";
import { countEmployees } from "../controllers/dashboard.controller";
const dashboardRouter: Router = Router();

dashboardRouter.get(
  "/employees/count",
  authMiddleware,
  adminMiddleware,
  countEmployees
);

export { dashboardRouter };
