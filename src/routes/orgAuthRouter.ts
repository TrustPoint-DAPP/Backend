import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import {
  generateJWTToken,
  generateNonce,
  getNonceMessage,
  uploadToIPFS,
  verifySignature,
} from "../helpers";
import CID from "cids";
import { file, validate } from "../middlewares";

const orgAuthRouter = Router();

const prisma = new PrismaClient();

orgAuthRouter.get("/nonce/:address", async (req, res) => {
  const { address } = req.params;

  // check if celeb account is there with the same address

  let organization = await prisma.organization.findUnique({
    where: { admin: address },
  });

  let nonce;
  if (!organization) {
    nonce = generateNonce();
    organization = await prisma.organization.create({
      data: {
        admin: address,
        nonce,
      },
    });
  } else {
    nonce = organization.nonce;
  }

  res.json({ message: getNonceMessage(nonce) });
});

orgAuthRouter.post(
  "/register",
  file("image", "image"),
  body("address").isEthereumAddress(),
  body("signature").isString(),
  body("name").isString(),
  body("description").isString(),
  validate,
  async (req, res) => {
    const { name, description, address, signature } = req.body;
    const file = req.file as Express.Multer.File;
    // check if celeb account is there with the same address

    const organization = await prisma.organization.findUnique({
      where: { admin: address },
    });

    if (!organization)
      return res.status(404).json({ message: "organization not found" });
    if (organization.registered)
      return res
        .status(400)
        .json({ message: "organization already registered" });

    const isSignValid = verifySignature(
      getNonceMessage(organization.nonce),
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

    await prisma.organization.update({
      where: { admin: address },
      data: {
        nonce: generateNonce(),
        registered: true,
        name,
        imageCID,
        description,
      },
    });
    const token = generateJWTToken(address, "ORG");

    res.json({ token });
  }
);

orgAuthRouter.post(
  "/login",
  body("address").isEthereumAddress(),
  body("signature").isString(),
  validate,
  async (req, res) => {
    const { address, signature } = req.body;

    const organization = await prisma.organization.findUnique({
      where: { admin: address },
    });

    if (!organization)
      return res.status(404).json({ message: "organization not found" });
    if (!organization.registered)
      return res.status(400).json({ message: "organization not registered" });

    const isSignValid = verifySignature(
      getNonceMessage(organization.nonce),
      signature,
      address
    );
    if (!isSignValid)
      return res.status(401).json({ message: "invalid signature" });

    await prisma.organization.update({
      where: { admin: address },
      data: {
        nonce: generateNonce(),
      },
    });

    const token = generateJWTToken(address, "ORG");

    res.json({ token });
  }
);

export default orgAuthRouter;
