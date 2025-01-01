import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {});

export const login = asyncHandler(async (req: Request, res: Response) => {});

export const sendCrendentials = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {}
);
