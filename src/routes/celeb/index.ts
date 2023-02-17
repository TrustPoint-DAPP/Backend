import { Router } from "express";
import celebAuthRouter from "./authRouter";

const celebRouter = Router();

celebRouter.use("/auth", celebAuthRouter);

export default celebRouter;
