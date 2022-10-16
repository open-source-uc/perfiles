-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ALUMNI';

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "telegramUsername" DROP NOT NULL;
