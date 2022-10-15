-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'COORDINATOR', 'MENTOR', 'MEMBER', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('PARTICIPATION', 'BY_REQUEST', 'MYSTERIOUS');

-- CreateEnum
CREATE TYPE "AchievementLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('OPEN', 'WAITING_REPLY', 'CLOSED');

-- CreateTable
CREATE TABLE "Member" (
    "username" TEXT NOT NULL,
    "telegramUsername" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "avatarURL" TEXT,
    "email" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "level" "AchievementLevel" NOT NULL,
    "pointsOverride" INTEGER,
    "memberUsername" TEXT,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementsOnMembers" (
    "id" TEXT NOT NULL,
    "obtainedAt" TIMESTAMP(3) NOT NULL,
    "manual" BOOLEAN NOT NULL DEFAULT false,
    "memberUsername" TEXT,
    "achievementId" TEXT,

    CONSTRAINT "AchievementsOnMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "state" "RequestState",
    "description" TEXT,
    "documents" BYTEA[],
    "achievementId" TEXT NOT NULL,
    "memberUsername" TEXT,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "shortname" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "memberUsername" TEXT,

    CONSTRAINT "ClaimLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_id_key" ON "Achievement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_name_key" ON "Achievement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementsOnMembers_id_key" ON "AchievementsOnMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimLink_id_key" ON "ClaimLink"("id");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLink" ADD CONSTRAINT "ClaimLink_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLink" ADD CONSTRAINT "ClaimLink_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE SET NULL ON UPDATE CASCADE;
