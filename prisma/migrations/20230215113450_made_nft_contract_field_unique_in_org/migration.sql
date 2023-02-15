/*
  Warnings:

  - A unique constraint covering the columns `[nftContract]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Organization_nftContract_key` ON `Organization`(`nftContract`);
