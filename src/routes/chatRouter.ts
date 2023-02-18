import {
  Celeb,
  Message,
  MessageType,
  Organization,
  PrismaClient,
  SenderType,
} from "@prisma/client";
import { Router } from "express";
import { param } from "express-validator";
import { chatManagerInstance } from "..";
import { CustomRequest } from "../interfaces";
import { file, validate } from "../middlewares";
import {
  onlyAuthorized,
  onlyAuthorizedOrganization,
} from "../protectionMiddlewares";

const chatRouter = Router();

const prisma = new PrismaClient();

chatRouter.get("/", onlyAuthorized, async (req, res) => {
  const { userType, celeb, organization } = req as CustomRequest;
  const messages: (Message & {
    celeb: Celeb;
    org: Organization;
  })[] = [];

  if (userType == "ORG") {
    const celebs = await prisma.message.groupBy({
      by: ["celebId"],
      where: {
        orgId: organization?.id,
      },
    });
    for (const { celebId } of celebs) {
      const message = await prisma.message.findFirst({
        where: { orgId: organization?.id, celebId },
        orderBy: { createdAt: "desc" },
        include: { org: true, celeb: true },
      });
      if (message) messages.push(message);
    }
  } else {
    const celebs = await prisma.message.groupBy({
      by: ["orgId"],
      where: {
        celebId: celeb?.id,
      },
    });
    for (const { orgId } of celebs) {
      const message = await prisma.message.findFirst({
        where: { orgId, celebId: celeb?.id },
        orderBy: { createdAt: "desc" },
        include: { org: true, celeb: true },
      });
      if (message) messages.push(message);
    }
  }

  res.json({ messages });
});

chatRouter.get(
  "/:id",
  onlyAuthorized,
  param("id").isNumeric(),
  validate,
  async (req, res) => {
    const { userType, celeb, organization } = req as CustomRequest;
    const { id } = req.params;

    let messages: Message[];

    if (userType == "ORG") {
      const celeb = await prisma.celeb.findUnique({
        where: { id: Number(id) },
      });
      if (!celeb)
        return res.status(404).json({ message: "celebrity not found" });
      messages = await prisma.message.findMany({
        where: { orgId: organization?.id, celebId: Number(id) },
      });
    } else {
      const org = await prisma.organization.findUnique({
        where: { id: Number(id) },
      });
      if (!org)
        return res.status(404).json({ message: "organization not found" });
      messages = await prisma.message.findMany({
        where: { orgId: Number(id), celebId: celeb?.id },
      });
    }

    res.json({ messages });
  }
);

chatRouter.post(
  "/:id/image",
  file("image", "image"),
  validate,
  async (req, res) => {
    const image = req.file as Express.Multer.File;
  }
);

chatRouter.post(
  "/initiate/:id",
  onlyAuthorizedOrganization,
  param("id").isNumeric(),
  validate,
  async (req, res) => {
    const { id } = req.params;
    const { organization } = req as CustomRequest;
    const celeb = await prisma.celeb.findUnique({ where: { id: Number(id) } });
    if (!celeb) return res.status(404).json({ message: "celebrity not found" });
    const totalMessages = await prisma.message.count({
      where: { celebId: celeb.id, orgId: organization?.id },
    });
    if (totalMessages == 0) {
      await chatManagerInstance.sendTextMessage({
        userType: "ORG",
        fromId: organization?.id as number,
        toId: celeb.id,
        text: "Hi",
        type: MessageType.TEXT,
      });
    }
    res.json({ message: "done" });
  }
);

export default chatRouter;
