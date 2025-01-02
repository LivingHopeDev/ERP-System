import { Router } from "express";
import { authMiddleware, validateData } from "../middlewares";
import { ProfileSchema } from "../schema/profile.schema";
import { updateProfile, viewProfile } from "../controllers/profile.controller";
const profileRouter: Router = Router();

profileRouter.get("/", authMiddleware, viewProfile);
profileRouter.patch(
  "/",
  validateData(ProfileSchema),
  authMiddleware,
  updateProfile
);
export { profileRouter };
