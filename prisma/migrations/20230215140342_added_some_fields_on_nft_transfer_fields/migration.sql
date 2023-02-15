/*
  Warnings:

  - Added the required column `transactionHash` to the `NFTTranfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionIndex` to the `NFTTranfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NFTTranfer` ADD COLUMN `transactionHash` VARCHAR(191) NOT NULL,
    ADD COLUMN `transactionIndex` INTEGER NOT NULL;
