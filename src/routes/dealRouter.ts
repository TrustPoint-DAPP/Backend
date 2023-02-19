import { Organization, PrismaClient } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import { CustomRequest } from "../interfaces";
import { file, validate } from "../middlewares";
import { onlyAuthorizedOrganization } from "../protectionMiddlewares";
import Validator from "validatorjs";
import { uploadJSONtoIPFS } from "../helpers";
import CID from "cids";
import { signForDealCreation } from "../signatures";

const dealRouter = Router();
const prisma = new PrismaClient();

dealRouter.post(
  "/",
  onlyAuthorizedOrganization,
  file("metadata", "json"),
  body("celebRoyalty").isInt({ min: 0, max: 10000 }),
  body("orgRoyalty").isInt({ min: 0, max: 10000 }),
  body("oneOffFees").isNumeric(),
  body("celebId").isNumeric(),
  validate,
  async (req, res) => {
    const organization = (req as CustomRequest).organization as Organization;
    const { celebRoyalty, orgRoyalty, oneOffFees, celebId } = req.body;
    const celeb = await prisma.celeb.findUnique({
      where: { id: Number(celebId) },
    });
    if (!celeb) return res.status(404).json({ message: "Celeb not found" });
    const metadataFile = req.file as Express.Multer.File;
    let jsonFileData;
    try {
      jsonFileData = JSON.parse(metadataFile.buffer.toString("utf-8"));
    } catch (err) {
      return res.status(422).json({ message: "invalid json data" });
    }
    const response = await uploadJSONtoIPFS(jsonFileData);
    const metadataCID = `${new CID(response.Hash).toV1().toString("base16")}`;
    let metadata = await prisma.nFTMetadata.findUnique({
      where: { cid: metadataCID },
    });
    if (!metadata) {
      await prisma.nFTMetadata.create({
        data: {
          cid: metadataCID,
          image: jsonFileData.image,
          name: jsonFileData.name,
          description: jsonFileData.description,
          animationURL: jsonFileData.animationURL,
          external_url: jsonFileData.external_url,
          animation_url: jsonFileData.animation_url,
        },
      });

      for (const attribute of jsonFileData.attributes) {
        await prisma.nFTAttribute.create({
          data: {
            metadata: { connect: { cid: metadataCID } },
            display_type: attribute.display_type,
            trait_type: attribute.trait_type,
            value: attribute.value,
          },
        });
      }
    }

    const nonce = new Date().getTime().toString();

    const signature = await signForDealCreation({
      orgId: organization.id.toString(),
      orgAdmin: organization.admin,
      amount: oneOffFees,
      royaltyBasisPoints: celebRoyalty,
      orgRoyaltyBasisPoints: orgRoyalty,
      counterParty: celeb.address,
      orgRoyaltyReceiver: organization.admin,
      nftCID: metadataCID,
      nonce,
    });
    res.json({ metadataCID, nonce, signature });
  }
);

export default dealRouter;
