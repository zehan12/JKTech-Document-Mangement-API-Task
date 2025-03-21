/*
  Warnings:

  - Added the required column `mineType` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IngestionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "mineType" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Ingestion" (
    "id" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,
    "status" "IngestionStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingestion_pkey" PRIMARY KEY ("id")
);
