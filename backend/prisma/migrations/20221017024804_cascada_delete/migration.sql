-- DropForeignKey
ALTER TABLE "ClaimLink" DROP CONSTRAINT "ClaimLink_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_memberUsername_fkey";

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClaimLink" ADD CONSTRAINT "ClaimLink_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
