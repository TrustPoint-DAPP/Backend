/*
  Warnings:

  - You are about to drop the column `proposalId` on the `Deal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Deal_proposalId_key` ON `Deal`;

-- AlterTable
ALTER TABLE `Deal` DROP COLUMN `proposalId`;
