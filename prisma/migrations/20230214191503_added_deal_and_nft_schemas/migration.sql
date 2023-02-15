-- CreateTable
CREATE TABLE `NFTAttribute` (
    `metadataCID` VARCHAR(191) NOT NULL,
    `trait_type` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `display_type` VARCHAR(191) NULL,

    PRIMARY KEY (`metadataCID`, `trait_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NFTMetadata` (
    `cid` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `animationURL` VARCHAR(191) NULL,
    `external_url` VARCHAR(191) NULL,
    `animation_url` VARCHAR(191) NULL,

    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deal` (
    `id` INTEGER NOT NULL,
    `celebAddress` VARCHAR(191) NOT NULL,
    `oneOffFees` VARCHAR(191) NOT NULL,
    `orgId` INTEGER NOT NULL,
    `orgRoyaltyReceier` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `cancelled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nft` (
    `id` INTEGER NOT NULL,
    `tokenId` INTEGER NOT NULL,
    `dealId` INTEGER NOT NULL,
    `cid` VARCHAR(191) NOT NULL,
    `royaltyBasisPoints` INTEGER NOT NULL,
    `orgRoyaltyBasisPoints` INTEGER NOT NULL,
    `royaltySplitter` VARCHAR(191) NULL,
    `created` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NFTAttribute` ADD CONSTRAINT `NFTAttribute_metadataCID_fkey` FOREIGN KEY (`metadataCID`) REFERENCES `NFTMetadata`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_celebAddress_fkey` FOREIGN KEY (`celebAddress`) REFERENCES `Celeb`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nft` ADD CONSTRAINT `Nft_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `NFTMetadata`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nft` ADD CONSTRAINT `Nft_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `Deal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
