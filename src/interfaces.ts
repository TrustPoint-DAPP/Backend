import { Celeb, Organization } from "@prisma/client";
import { Request } from "express";

export interface CustomRequest extends Request {
  userType: "ORG" | "CELEB";
  organization?: Organization;
  celeb?: Celeb;
}
