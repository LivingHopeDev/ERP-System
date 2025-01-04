import { Router } from "express";
import { validateData } from "../middlewares";

import { UserSchema } from "../schema/user.schema";
import { login, register, logout } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares";
const authRouter: Router = Router();

authRouter.post("/register", validateData(UserSchema), register);
authRouter.post("/login", validateData(UserSchema), login);
authRouter.post("/logout", authMiddleware, logout);

export { authRouter };
