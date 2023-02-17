import { Router } from "express";
import orgAuthRouter from "./authRouter";

const orgRouter = Router();

orgRouter.use("/auth", orgAuthRouter);

export default orgRouter;
