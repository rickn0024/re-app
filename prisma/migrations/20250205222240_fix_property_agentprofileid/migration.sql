/*
  Warnings:

  - You are about to drop the `VarificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AgentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AgentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AgentProfile" DROP CONSTRAINT "AgentProfile_id_fkey";

-- DropIndex
DROP INDEX "agent_profile_idx";

-- AlterTable
ALTER TABLE "AgentProfile" ADD COLUMN     "userId" UUID NOT NULL;

-- DropTable
DROP TABLE "VarificationToken";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_profile_userId_idx" ON "AgentProfile"("userId");

-- AddForeignKey
ALTER TABLE "AgentProfile" ADD CONSTRAINT "AgentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
