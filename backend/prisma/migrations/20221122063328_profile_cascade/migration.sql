-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_memberUsername_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_memberUsername_fkey" FOREIGN KEY ("memberUsername") REFERENCES "Member"("username") ON DELETE CASCADE ON UPDATE CASCADE;
