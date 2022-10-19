-- DropForeignKey
ALTER TABLE "AchievementsOnMembers" DROP CONSTRAINT "AchievementsOnMembers_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "AchievementsOnMembers" DROP CONSTRAINT "AchievementsOnMembers_memberUsername_fkey";

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementsOnMembers" ADD CONSTRAINT "AchievementsOnMembers_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
