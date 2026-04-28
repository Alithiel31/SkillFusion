/*
  Warnings:

  - Added the required column `background_color` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "background_color" TEXT NOT NULL;
