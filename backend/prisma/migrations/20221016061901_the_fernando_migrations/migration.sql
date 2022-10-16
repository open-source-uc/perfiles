/*
  Warnings:

  - The values [WAITING_REPLY,CLOSED] on the enum `RequestState` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUPERUSER,COORDINATOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `manual` on the `AchievementsOnMembers` table. All the data in the column will be lost.
  - You are about to drop the column `memberUsername` on the `ClaimLink` table. All the data in the column will be lost.
  - You are about to drop the column `avatarURL` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `telegramUsername` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `documents` on the `Request` table. All the data in the column will be lost.
  - Made the column `memberUsername` on table `AchievementsOnMembers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `achievementId` on table `AchievementsOnMembers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestState_new" AS ENUM ('OPEN', 'APPROVED', 'REJECTED');
ALTER TABLE "Request" ALTER COLUMN "state" TYPE "RequestState_new" USING ("state"::text::"RequestState_new");
ALTER TYPE "RequestState" RENAME TO "RequestState_old";
ALTER TYPE "RequestState_new" RENAME TO "RequestState";
DROP TYPE "RequestState_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SERVICE', 'CHAIR', 'MENTOR', 'MEMBER', 'ALUMNI', 'APLICANT', 'INACTIVE', 'SUSPENDED');
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AchievementsOnMembers" DROP CONSTRAINT "AchievementsOnMembers_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "AchievementsOnMembers" DROP CONSTRAINT "AchievementsOnMembers_memberUsername_fkey";

-- DropForeignKey
ALTER TABLE "ClaimLink" DROP CONSTRAINT "ClaimLink_memberUsername_fkey";

-- AlterTable
ALTER TABLE "AchievementsOnMembers" DROP COLUMN "manual",
ADD COLUMN     "awardedByUsername" TEXT,
ALTER COLUMN "memberUsername" SET NOT NULL,
ALTER COLUMN "achievementId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ClaimLink" DROP COLUMN "memberUsername",
ADD COLUMN     "creatorUsername" TEXT,
ADD COLUMN     "user_limit" INTEGER;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "avatarURL",
DROP COLUMN "email",
DROP COLUMN "level",
DROP COLUMN "name",
DROP COLUMN "score",
DROP COLUMN "telegramUsername",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "documents";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "memberUsername" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT,
    "telegramUsername" TEXT,
    "avatarURL" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimLinkClaim" (
    "id" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL,
    "memberUsername" TEXT NOT NULL,
    "claimLinkId" TEXT NOT NULL,

    CONSTRAINT "ClaimLinkClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_memberUsername_key" ON "Profile"("memberUsername");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLinkClaim_id_key" ON "ClaimLinkClaim"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_awardedByUsername_fkey" FOREIGN KEY ("awardedByUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLink" ADD CONSTRAINT "ClaimLink_creatorUsername_fkey" FOREIGN KEY ("creatorUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLinkClaim" ADD CONSTRAINT "ClaimLinkClaim_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLinkClaim" ADD CONSTRAINT "ClaimLinkClaim_claimLinkId_fkey" FOREIGN KEY ("claimLinkId") REFERENCES "ClaimLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
