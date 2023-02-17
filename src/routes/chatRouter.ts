import { Celeb, Message, Organization, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { CustomRequest } from "../interfaces";
import { onlyAuthorized } from "../protectionMiddlewares";

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

chatRouter.get("/:id", onlyAuthorized, async (req, res) => {
  const { userType, celeb, organization } = req as CustomRequest;
  const { id } = req.params;

  let messages: Message[];

  if (userType == "ORG") {
    const celeb = await prisma.celeb.findUnique({ where: { id: Number(id) } });
    if (!celeb) return res.status(404).json({ message: "celebrity not found" });
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
});

export default chatRouter;
