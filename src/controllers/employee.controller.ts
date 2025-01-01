import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";

export const addEmployee = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const getAllEmployee = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const getEmployeeById = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {}
);
