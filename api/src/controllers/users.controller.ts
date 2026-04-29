import type { Request, Response } from "express";
import { prisma } from "../models/client"
import type { AuthenticatedRequest } from "../@types/express";
import { NotFoundError } from "../lib/errors";


export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    omit: { password: true },
    include: { role: true }
  });
  res.json(users);
}

// Export des données de l'utilisateur connecté (RGPD) -----------------------------------------------

export async function exportMyData(req: AuthenticatedRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: {
      role: { select: { name: true } },
      enrollments: { include: { cours: { select: { id: true, title: true } } } },
      activations: { include: { cours: { select: { id: true, title: true } } } },
      badges: { include: { badge: { select: { name: true, description: true } } } },
      commentaires: { include: { cours: { select: { id: true, title: true } } } },
      opinions: { include: { cours: { select: { id: true, title: true } } } },
      notifications: { include: { cours: { select: { id: true, title: true } } } },
      createdCours: { select: { id: true, title: true, createdAt: true } },
    },
  });
  if (!user) throw new NotFoundError("Utilisateur non trouvé");

  const exportData = {
    exportedAt: new Date().toISOString(),
    profil: {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      urlProfilImage: user.urlProfilImage,
      role: user.role.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    coursInscrits: user.enrollments.map(e => ({
      id: e.cours.id,
      titre: e.cours.title,
      inscritLe: e.createdAt,
    })),
    progression: user.activations.map(a => ({
      id: a.cours.id,
      titre: a.cours.title,
      termine: a.IsEnd,
      depuis: a.createdAt,
    })),
    badges: user.badges.map(b => ({
      nom: b.badge.name,
      description: b.badge.description,
      obtenuLe: b.createdAt,
    })),
    commentaires: user.commentaires.map(c => ({
      cours: c.cours.title,
      contenu: c.description,
      publiéLe: c.createdAt,
    })),
    avis: user.opinions.map(o => ({
      cours: o.cours.title,
      contenu: o.content,
      note: o.note,
      publiéLe: o.createdAt,
    })),
    notifications: user.notifications.map(n => ({
      contenu: n.content,
      cours: n.cours.title,
      reçuLe: n.createdAt,
    })),
    coursCreés: user.createdCours.map(c => ({
      id: c.id,
      titre: c.title,
      créeLe: c.createdAt,
    })),
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="mes-donnees-skillfusion-${user.id}.json"`
  );
  res.status(200).json(exportData);
}

// Suppression du compte de l'utilisateur connecté (RGPD) --------------------------------------------

export async function deleteMyAccount(req: AuthenticatedRequest, res: Response) {
  const userId = req.user!.userId;

  const coursCreés = await prisma.cours.findMany({
    where: { authorId: userId },
    select: { id: true, title: true }
  });

  if (coursCreés.length > 0) {
    res.status(409).json({
      code: "HAS_CREATED_COURSES",
      message: "Vous avez des cours créés. Veuillez les transférer ou les supprimer avant de continuer.",
      cours: coursCreés
    });
    return;
  }

  await prisma.user.delete({ where: { id: userId } });
  res.status(204).send();
}