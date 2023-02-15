import { BlockchainSyncTypes } from "@prisma/client";
import { syncEventsTillNow } from "../../../helpers";
import { Logger } from "../../../typechain-types";
import nftBatchTransferHandler from "./nftBatchTransferHandler";
import nftTransferHandler from "./nftTransferHandler";

export default async function loggerEventListeners(logger: Logger) {
  const TransferSingleFilter = logger.filters.TransferSingle();
  const TransferBatchFilter = logger.filters.TransferBatch();

  syncEventsTillNow(
    logger,
    BlockchainSyncTypes.NFTSingleTransfer,
    TransferSingleFilter,
    nftTransferHandler
  );
  logger.on(
    TransferSingleFilter,
    (
      _contractAddress,
      _operator,
      _from,
      _to,
      _tokenId,
      _value,
      eventEmitted
    ) => {
      nftTransferHandler(eventEmitted);
    }
  );

  syncEventsTillNow(
    logger,
    BlockchainSyncTypes.NFTBatchTransfer,
    TransferBatchFilter,
    nftBatchTransferHandler
  );

  logger.on(
    TransferBatchFilter,
    (
      _contractAddress,
      _operator,
      _from,
      _to,
      _tokenIds,
      _values,
      eventEmitted
    ) => {
      nftBatchTransferHandler(eventEmitted);
    }
  );
}
