import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { param } from "express-validator";
import { validate } from "../middlewares";

const userRouter = Router();

const prisma = new PrismaClient();

userRouter.get(
  "/check/:address",
  param("address").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { address } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { admin: address },
    });
    const celeb = await prisma.celeb.findUnique({ where: { address } });
    res.json({
      registered: Boolean(organization || celeb),
      type:
        organization && organization.registered
          ? "ORG"
          : celeb && celeb.registered
          ? "CELEB"
          : null,
    });
  }
);

export default userRouter;
