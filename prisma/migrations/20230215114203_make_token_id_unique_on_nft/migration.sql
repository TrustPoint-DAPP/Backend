/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Nft_tokenId_key` ON `Nft`(`tokenId`);

-- AddForeignKey
ALTER TABLE `NFTTranfer` ADD CONSTRAINT `NFTTranfer_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Nft`(`tokenId`) ON DELETE RESTRICT ON UPDATE CASCADE;
