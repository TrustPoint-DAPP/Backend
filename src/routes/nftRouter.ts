import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { param } from "express-validator";
import { CustomRequest } from "../interfaces";
import { paginate, validate } from "../middlewares";
import { onlyAuthorized } from "../protectionMiddlewares";

const nftRouter = Router();
const prisma = new PrismaClient();

nftRouter.get("/", onlyAuthorized, paginate(24), validate, async (req, res) => {
  const { organization, celeb } = req as CustomRequest;
  const { offset, limit } = req.query;
  const nfts = await prisma.nft.findMany({
    where: {
      deal: {
        celebAddress: celeb?.address,
        orgId: organization?.id,
        done: true,
      },
    },
    include: { deal: true, metadata: true },
    take: Number(limit),
    skip: Number(offset),
  });
  const totalNFTs = await prisma.nft.count({
    where: {
      deal: {
        celebAddress: celeb?.address,
        orgId: organization?.id,
        done: true,
      },
    },
  });
  res.json({ nfts, totalPages: Math.ceil(totalNFTs / Number(limit)) });
});

nftRouter.get("/:id", param("id").isNumeric(), validate, async (req, res) => {
  const { id } = req.params;
  const nft = await prisma.nft.findUnique({
    where: { id: Number(id) },
    include: {
      deal: true,
      metadata: { include: { attributes: true } },
      transfers: true,
    },
  });
  if (!nft) return res.status(404).json({ message: "nft not found" });
  res.json({ nft });
});

nftRouter.get(
  "/tokenId/:tokenId",
  param("tokenId").isNumeric(),
  validate,
  async (req, res) => {
    const { tokenId } = req.params;
    const nft = await prisma.nft.findUnique({
      where: { tokenId: Number(tokenId) },
      include: {
        deal: true,
        metadata: { include: { attributes: true } },
        transfers: true,
      },
    });
    if (!nft) return res.status(404).json({ message: "nft not found" });
    res.json({ nft });
  }
);

export default nftRouter;
