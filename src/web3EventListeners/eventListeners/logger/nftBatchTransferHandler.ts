import {
  BlockchainSyncTypes,
  PrismaClient,
  TransferType,
} from "@prisma/client";
import { checkAndCreateSync } from "../../../helpers";
import { TransferBatchEvent } from "../../../typechain-types/contracts/Logger";

const prisma = new PrismaClient();

export default async function nftBatchTransferHandler(
  eventEmitted: TransferBatchEvent
) {
  const { blockNumber, transactionHash, transactionIndex, logIndex, args } =
    eventEmitted;
  const { contractAddress, from, to, ids, values } = args;

  const organization = await prisma.organization.findUnique({
    where: { nftContract: contractAddress },
  });
  if (!organization) return;

  if (
    !(await checkAndCreateSync(
      blockNumber,
      transactionHash,
      transactionIndex,
      logIndex,
      BlockchainSyncTypes.NFTBatchTransfer
    ))
  )
    return;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const value = values[i];

    const nft = await prisma.nft.findUnique({ where: { tokenId: Number(id) } });
    if (nft && from == "0x0000000000000000000000000000000000000000") {
      await prisma.nft.update({
        where: { tokenId: Number(id) },
        data: { totalSupply: nft.totalSupply + Number(value) },
      });
    }
    if (nft && to == "0x0000000000000000000000000000000000000000") {
      await prisma.nft.update({
        where: { tokenId: Number(id) },
        data: { totalSupply: nft.totalSupply - Number(value) },
      });
    }

    await prisma.nFTTranfer.create({
      data: {
        blockNumber,
        transactionHash,
        transactionIndex,
        logIndex,
        nft: {
          connect: {
            tokenId: Number(id),
          },
        },
        from,
        to,
        value: Number(value),
        type: TransferType.Batch,
      },
    });
  }
}
