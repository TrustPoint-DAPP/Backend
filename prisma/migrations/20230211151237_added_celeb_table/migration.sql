-- CreateTable
CREATE TABLE `Celeb` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `nonce` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `imageCID` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `email` VARCHAR(191) NULL,
    `bio` LONGTEXT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `registered` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Celeb_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
