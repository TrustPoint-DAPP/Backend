import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "./helpers";

const prisma = new PrismaClient();

export async function onlyAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "authorization token not found" });
  }
  if (
    !(
      authorization.startsWith("Bearer") && authorization.split(" ").length == 2
    )
  ) {
    return res
      .status(400)
      .json({ message: "authorization token is in invalid format" });
  }
  const token = authorization.split(" ")[1];
  const decoded = verifyJWTToken(token) as {
    username: string;
    type: "CELEB" | "ORG";
  };
  if (!decoded) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
  (req as any).userType = decoded.type;
  if (decoded.type == "ORG") {
    const organization = await prisma.organization.findUnique({
      where: { admin: decoded.username },
    });
    if (!organization)
      return res.status(401).json({
        message:
          "The organization associated to this authorization token not found",
      });
    (req as any).organization = organization;
    return next();
  }

  const celeb = await prisma.celeb.findUnique({
    where: { address: decoded.username },
  });
  if (!celeb)
    return res.status(401).json({
      message: "The celebrity associated to this authorization token not found",
    });
  (req as any).celeb = celeb;
  return next();
}

export async function onlyAuthorizedOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  onlyAuthorized(req, res, () => {
    const { type } = req as Request & {
      type: "CELEB" | "ORG";
    };
    if (type != "ORG")
      return res
        .status(401)
        .json({ message: "The route is only for registered organizations" });
    next();
  });
}

export async function onlyAuthorizedCeleb(
  req: Request,
  res: Response,
  next: NextFunction
) {
  onlyAuthorized(req, res, () => {
    const { type } = req as Request & {
      type: "CELEB" | "ORG";
    };
    if (type != "CELEB")
      return res
        .status(401)
        .json({ message: "The route is only for registered celebrities" });
    next();
  });
}
