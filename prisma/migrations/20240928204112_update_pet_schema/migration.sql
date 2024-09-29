/*
  Warnings:

  - You are about to drop the column `size_cm` on the `pets` table. All the data in the column will be lost.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "size_cm",
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ALTER COLUMN "energy_level" SET DATA TYPE TEXT;
