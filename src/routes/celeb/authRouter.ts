import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { body, param } from "express-validator";
import {
  generateJWTToken,
  generateNonce,
  getNonceMessage,
  uploadToIPFS,
  verifySignature,
} from "../../helpers";
import CID from "cids";
import { file, validate } from "../../middlewares";

const celebAuthRouter = Router();

const prisma = new PrismaClient();

celebAuthRouter.get(
  "/nonce/:address",
  param("address").isEthereumAddress(),
  validate,
  async (req, res) => {
    const { address } = req.params;

    // check if organization account is there with the same address
    const organization = await prisma.organization.findFirst({
      where: { admin: address, registered: true },
    });
    if (organization)
      return res
        .status(400)
        .json({ message: "a organization account exists with this address" });

    let celeb = await prisma.celeb.findUnique({
      where: { address },
    });
    let nonce;
    if (!celeb) {
      nonce = generateNonce();
      celeb = await prisma.celeb.create({
        data: {
          address,
          nonce,
        },
      });
    } else {
      nonce = celeb.nonce;
    }

    res.json({ message: getNonceMessage(nonce), registered: celeb.registered });
  }
);

celebAuthRouter.post(
  "/register",
  file("image", "image"),
  body("address").isEthereumAddress(),
  body("signature").isString(),
  body("name").isString(),
  body("bio").isString(),
  validate,
  async (req, res) => {
    const { name, bio, address, signature } = req.body;
    const file = req.file as Express.Multer.File;

    // check if organization account is there with the same address
    const organization = await prisma.organization.findFirst({
      where: { admin: address, registered: true },
    });
    if (organization)
      return res
        .status(400)
        .json({ message: "a organization account exists with this address" });

    const celeb = await prisma.celeb.findUnique({
      where: { address },
    });

    if (!celeb) return res.status(404).json({ message: "celeb not found" });
    if (celeb.registered)
      return res.status(400).json({ message: "celeb already registered" });

    const isSignValid = verifySignature(
      getNonceMessage(celeb.nonce),
      signature,
      address
    );
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    // upload image to ipfs
    const response = await uploadToIPFS(file);
    const imageCID = `0x${new CID(response.Hash)
      .toV1()
      .toString("base16")
      .substring(1)}`;

    await prisma.celeb.update({
      where: { address },
      data: {
        nonce: generateNonce(),
        registered: true,
        name,
        imageCID,
        bio,
      },
    });
    const token = generateJWTToken(address, "CELEB");

    res.json({ token });
  }
);

celebAuthRouter.post(
  "/login",
  body("address").isEthereumAddress(),
  body("signature").isString(),
  validate,
  async (req, res) => {
    const { address, signature } = req.body;

    const celeb = await prisma.celeb.findUnique({
      where: { address },
    });

    if (!celeb) return res.status(404).json({ message: "celeb not found" });
    if (!celeb.registered)
      return res.status(400).json({ message: "celeb not registered" });

    const isSignValid = verifySignature(
      getNonceMessage(celeb.nonce),
      signature,
      address
    );
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    await prisma.celeb.update({
      where: { address },
      data: {
        nonce: generateNonce(),
      },
    });

    const token = generateJWTToken(address, "CELEB");

    res.json({
      celeb: await prisma.celeb.findUnique({ where: { address } }),
      token,
    });
  }
);

export default celebAuthRouter;
