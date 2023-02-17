import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { paginate } from "../../middlewares";
import celebAuthRouter from "./authRouter";

const celebRouter = Router();

const prisma = new PrismaClient();

celebRouter.use("/auth", celebAuthRouter);

celebRouter.get("/", paginate(24), async (req, res) => {
  const { limit, offset } = req.query;
  const totalCelebs = await prisma.celeb.count({ where: { registered: true } });
  const celebs = await prisma.celeb.findMany({
    where: { registered: true },
    skip: Number(offset),
    take: Number(limit),
  });
  res.json({ celebs, total_pages: Math.ceil(totalCelebs / Number(limit)) });
});

export default celebRouter;
