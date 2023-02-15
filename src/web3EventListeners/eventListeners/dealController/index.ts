import { BlockchainSyncTypes } from "@prisma/client";
import { syncEventsTillNow } from "../../../helpers";
import { DealController } from "../../../typechain-types";
import dealCancelledHandler from "./dealCancelledHandler";
import dealCompletedHandler from "./dealCompletedHandler";
import dealCreatedHandler from "./dealCreatedHandler";

export default async function dealControllerEventListeners(
  dealController: DealController
) {
  const DealCreatedFilter = dealController.filters.DealCreated();
  const DealCancelledFilter = dealController.filters.DealCancelled();
  const DealCompletedFilter = dealController.filters.DealCompleted();

  await syncEventsTillNow(
    dealController,
    BlockchainSyncTypes.DealCreated,
    DealCreatedFilter,
    dealCreatedHandler
  );
  dealController.on(DealCreatedFilter, (_deal, _nfts, eventEmitted) => {
    dealCreatedHandler(eventEmitted);
  });

  await syncEventsTillNow(
    dealController,
    BlockchainSyncTypes.DealCancelled,
    DealCancelledFilter,
    dealCancelledHandler
  );
  dealController.on(
    DealCancelledFilter,
    (_dealId, _orgId, _counterParty, eventEmitted) => {
      dealCancelledHandler(eventEmitted);
    }
  );

  await syncEventsTillNow(
    dealController,
    BlockchainSyncTypes.DealCompleted,
    DealCompletedFilter,
    dealCompletedHandler
  );
  dealController.on(
    DealCompletedFilter,
    (
      _dealId,
      _orgId,
      _counterParty,
      _nftIds,
      _tokenIds,
      _royaltySplitters,
      eventEmitted
    ) => {
      dealCompletedHandler(eventEmitted);
    }
  );
}
