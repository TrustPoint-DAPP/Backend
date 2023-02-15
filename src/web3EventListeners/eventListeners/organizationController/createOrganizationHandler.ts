import { BlockchainSyncTypes } from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { CreateOrganizationEvent } from "../../../typechain-types/contracts/Organization.sol/OrganizationController";

export default async function createOrganizationHandler(
  eventEmitted: CreateOrganizationEvent
) {
  const { blockNumber, transactionHash, transactionIndex, logIndex, args } =
    eventEmitted;
  const { orgId, adminAddress } = args;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.OrganizationCreated
    ))
  )
    return;
}
