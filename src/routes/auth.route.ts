import { Router } from "express";
import { validateData } from "../middlewares";

import { UserSchema } from "../schema/user.schema";
import { register } from "../controllers/auth.controller";
const authRouter: Router = Router();

authRouter.post("/register", validateData(UserSchema), register);

export { authRouter };
