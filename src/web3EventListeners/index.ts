import { ethers } from "ethers";
import {
  DEAL_CONTRACT_ADDRESS,
  LOGGER_CONTRACT_ADDRESS,
  ORGANIZATION_CONTRACT_ADDRESS,
  provider,
} from "../config";
import ORGANIZATION_CONTROLLER_ABI from "../abi/OrganizationController.json";
import DEAL_CONTROLLER_ABI from "../abi/DealController.json";
import LOGGER_ABI from "../abi/Logger.json";
import {
  DealController,
  Logger,
  OrganizationController,
} from "../typechain-types";
import dealControllerEventListeners from "./eventListeners/dealController";

const organizationController = new ethers.Contract(
  ORGANIZATION_CONTRACT_ADDRESS,
  ORGANIZATION_CONTROLLER_ABI,
  provider
) as OrganizationController;

const dealController = new ethers.Contract(
  DEAL_CONTRACT_ADDRESS,
  DEAL_CONTROLLER_ABI,
  provider
) as DealController;

const logger = new ethers.Contract(
  LOGGER_CONTRACT_ADDRESS,
  LOGGER_ABI,
  provider
) as Logger;

export default async function web3EventListeners() {
  dealControllerEventListeners(dealController);
}
