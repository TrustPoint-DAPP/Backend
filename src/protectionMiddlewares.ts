import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { verifyJWTToken } from "./helpers";
import { CustomRequest } from "./interfaces";

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
  (req as CustomRequest).userType = decoded.type;
  if (decoded.type == "ORG") {
    const organization = await prisma.organization.findUnique({
      where: { admin: decoded.username },
    });
    if (!organization)
      return res.status(401).json({
        message:
          "The organization associated to this authorization token not found",
      });
    (req as CustomRequest).organization = organization;
    return next();
  }

  const celeb = await prisma.celeb.findUnique({
    where: { address: decoded.username },
  });
  if (!celeb)
    return res.status(401).json({
      message: "The celebrity associated to this authorization token not found",
    });
  (req as CustomRequest).celeb = celeb;
  return next();
}

export async function onlyAuthorizedOrganization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  onlyAuthorized(req, res, () => {
    const { userType } = req as CustomRequest;
    if (userType != "ORG")
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
    const { userType } = req as CustomRequest;
    if (userType != "CELEB")
      return res
        .status(401)
        .json({ message: "The route is only for registered celebrities" });
    next();
  });
}

export async function onlyAuthenticatedSocket(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const token = socket.handshake.headers.token as string;
  const decoded = verifyJWTToken(token) as {
    username: string;
    type: "CELEB" | "ORG";
  };
  if (!decoded) return next(new Error("Invalid authorization token"));

  socket.data.userType = decoded.type;
  if (decoded.type == "ORG") {
    const organization = await prisma.organization.findUnique({
      where: { admin: decoded.username },
    });
    if (!organization)
      return next(
        new Error(
          "The organization associated to this authorization token not found"
        )
      );
    socket.data.organization = organization;

    return next();
  }

  const celeb = await prisma.celeb.findUnique({
    where: { address: decoded.username },
  });
  if (!celeb)
    return next(
      new Error(
        "The celebrity associated to this authorization token not found"
      )
    );

  socket.data.celeb = celeb;
  next();
}
