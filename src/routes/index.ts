import { Router } from "express";
import { authRouter } from "./auth.route";
import { employeeRouter } from "./employee.route";
import { profileRouter } from "./profile.route";
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use("/profile", profileRouter);

export default rootRouter;
