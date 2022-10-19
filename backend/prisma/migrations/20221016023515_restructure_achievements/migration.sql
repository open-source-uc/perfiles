/*
  Warnings:

  - You are about to drop the column `memberUsername` on the `Achievement` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AchievementType" ADD VALUE 'MANUAL';
ALTER TYPE "AchievementType" ADD VALUE 'AUTOMATIC';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'APLICANT';

-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_memberUsername_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "memberUsername",
ADD COLUMN     "creatorUsername" TEXT;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;
