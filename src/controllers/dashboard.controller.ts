import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { DashboardService } from "../services/dashboard.service";
const dashboardService = new DashboardService();

export const countEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    const { data } = await dashboardService.countEmployees();
    res.status(200).json({ data });
  }
);
