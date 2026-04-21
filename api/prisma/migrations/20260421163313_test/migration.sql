/*
  Warnings:

  - Made the column `cours_id` on table `Cour_content` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Cour_content_cours_id_numeros_page_key";

-- AlterTable
ALTER TABLE "Cour_content" ALTER COLUMN "cours_id" SET NOT NULL;
