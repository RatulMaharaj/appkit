/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `User` table. All the data in the column will be lost.
  - Added the required column `contactPerson` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "CreatedAt",
DROP COLUMN "company",
DROP COLUMN "surname",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "registrationNumber" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateCreated",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "suburb" TEXT,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
