-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VISITOR', 'STUDENT', 'INSTRUCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Difficulte" AS ENUM ('DEBUTANT', 'FACILE', 'INTERMEDIAIRE', 'DIFFICILE', 'EXPERT');

-- CreateEnum
CREATE TYPE "Visibilite" AS ENUM ('BROUILLON', 'PUBLIE', 'ARCHIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "url_image_profil" TEXT,
    "role" "Role" NOT NULL DEFAULT 'VISITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "phrase_resume" TEXT,
    "url_image_intro" TEXT,
    "difficulte" "Difficulte" NOT NULL,
    "resume" TEXT,
    "visibilite" "Visibilite" NOT NULL DEFAULT 'BROUILLON',
    "createur_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectif_Pedagogique" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Objectif_Pedagogique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outils" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Outils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cour_content" (
    "id" SERIAL NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "numeros_page" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,

    CONSTRAINT "Cour_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_has_Cours" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_has_Cours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours_active" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "est_termine" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cours_active_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_has_Badge" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "badge_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_has_Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours_has_Categories" (
    "id" SERIAL NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "categories_id" INTEGER NOT NULL,

    CONSTRAINT "Cours_has_Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours_has_Outils" (
    "id" SERIAL NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "outils_id" INTEGER NOT NULL,

    CONSTRAINT "Cours_has_Outils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cours_has_Objectif_Pedagogique" (
    "id" SERIAL NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "objectif_pedagogique_id" INTEGER NOT NULL,

    CONSTRAINT "Cours_has_Objectif_Pedagogique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentaire" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "id_auteur" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "contenu" TEXT NOT NULL,
    "cours_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cour_content_cours_id_numeros_page_key" ON "Cour_content"("cours_id", "numeros_page");

-- CreateIndex
CREATE UNIQUE INDEX "User_has_Cours_user_id_cours_id_key" ON "User_has_Cours"("user_id", "cours_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cours_active_user_id_cours_id_key" ON "Cours_active"("user_id", "cours_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_has_Badge_user_id_badge_id_key" ON "User_has_Badge"("user_id", "badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cours_has_Categories_cours_id_categories_id_key" ON "Cours_has_Categories"("cours_id", "categories_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cours_has_Outils_cours_id_outils_id_key" ON "Cours_has_Outils"("cours_id", "outils_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cours_has_Objectif_Pedagogique_cours_id_objectif_pedagogiqu_key" ON "Cours_has_Objectif_Pedagogique"("cours_id", "objectif_pedagogique_id");

-- CreateIndex
CREATE UNIQUE INDEX "Opinion_user_id_cours_id_key" ON "Opinion"("user_id", "cours_id");

-- AddForeignKey
ALTER TABLE "Cours" ADD CONSTRAINT "Cours_createur_id_fkey" FOREIGN KEY ("createur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cour_content" ADD CONSTRAINT "Cour_content_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_has_Cours" ADD CONSTRAINT "User_has_Cours_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_has_Cours" ADD CONSTRAINT "User_has_Cours_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_active" ADD CONSTRAINT "Cours_active_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_active" ADD CONSTRAINT "Cours_active_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_has_Badge" ADD CONSTRAINT "User_has_Badge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_has_Badge" ADD CONSTRAINT "User_has_Badge_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Categories" ADD CONSTRAINT "Cours_has_Categories_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Categories" ADD CONSTRAINT "Cours_has_Categories_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Outils" ADD CONSTRAINT "Cours_has_Outils_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Outils" ADD CONSTRAINT "Cours_has_Outils_outils_id_fkey" FOREIGN KEY ("outils_id") REFERENCES "Outils"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Objectif_Pedagogique" ADD CONSTRAINT "Cours_has_Objectif_Pedagogique_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cours_has_Objectif_Pedagogique" ADD CONSTRAINT "Cours_has_Objectif_Pedagogique_objectif_pedagogique_id_fkey" FOREIGN KEY ("objectif_pedagogique_id") REFERENCES "Objectif_Pedagogique"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_cours_id_fkey" FOREIGN KEY ("cours_id") REFERENCES "Cours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
