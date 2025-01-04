import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { AuthService } from "../services/auth.service";
const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { message, data } = await authService.register(req.body);
  res.status(201).json({ status: 201, message, data });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { message, user, token } = await authService.login(req.body);
  res.status(200).json({ status: 200, message, data: { token, user } });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = req.user.id;
  const { message } = await authService.logout(userId, token);
  res.status(200).json({ message: message });
});
