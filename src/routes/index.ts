import { Router } from "express";
import { authRouter } from "./auth.route";
import { employeeRouter } from "./employee.route";
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/employee", employeeRouter);

export default rootRouter;
