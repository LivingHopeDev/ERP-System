import asyncHandler from "../middlewares/asyncHandler";
import { ProfileService } from "../services/profile.service";
import { Request, Response } from "express";
const profileService = new ProfileService();

export const viewProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const { data } = await profileService.viewProfile(userId);
  res.status(200).json({ data });
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const { message } = await profileService.updateProfile(userId, req.body);
    res.status(200).json({ message });
  }
);
