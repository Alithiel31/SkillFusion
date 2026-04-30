import type { Request, Response } from "express";
import { prisma } from "../models/client"
import { AuthenticatedRequest } from "../@types/express";
import { NotFoundError, ConflictError } from "../lib/errors";
import z from "zod";
import { url } from "node:inspector";
import { parseIdFromParams } from "./utils";
import rolesController from "./roles.controller";



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
// Récupérer un utilisateur par son id
export async function getUserById(req: Request, res: Response) {
  const userId = await parseIdFromParams(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
    include: {
      role: true
    }
  });
  if (!user) {
    throw new NotFoundError(`Utilisateur avec l'id ${userId} non trouvé`);
  }
  res.status(200).json(user);
}

// Créer un nouvel utilisateur
export async function createUser(req: Request, res: Response) {
  const createUserBodySchema = z.object({
    pseudo: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    urlProfilImage: z.string().optional(),
    roleId: z.number().optional(),
  });
  const data = await createUserBodySchema.parseAsync(req.body);

  if (data.roleId) {
    const roleExists = await prisma.role.findUnique({
      where: { id: data.roleId }
    });

    if (!roleExists) {
      return res.status(400).json({ error: `Le rôle avec l'ID ${data.roleId} n'existe pas.` });
    }
  }

  const createdUser = await prisma.user.create({
    data: {
      pseudo: data.pseudo,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      urlProfilImage: data.urlProfilImage,
      roleId: data.roleId,
    }
  });
  res.status(201).json(createdUser);
}

// Mettre à jour un utilisateur
export async function updateUser(req: Request, res: Response) {
  const userId = await parseIdFromParams(req.params.id);
  
  // Schéma de validation des données
  const updateUserBodySchema = z.object({
    pseudo: z.string().min(1).optional(),
    email: z.string().optional(),
    password: z.string().min(6).optional(),
    firstname: z.string().min(1).optional(),
    lastname: z.string().min(1).optional(),
    urlProfilImage: z.string().optional(),
    rolesId: z.number().optional(),
  });
  
  const data = await updateUserBodySchema.parseAsync(req.body);

  // Si l'email est modifié, vérifie qu'il soit unique
  const { email } = data;

  if (email) {
    // Ne pas vérifier si l'email appartient déjà à l'utilisateur en cours
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    // Si l'email existe et ce n'est pas celui de l'utilisateur actuel, alors renvoyer une erreur
    if (existingUser && existingUser.id !== userId) {
      throw new ConflictError("Email déjà utilisé");
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      pseudo: data.pseudo,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      urlProfilImage: data.urlProfilImage,
      roleId: data.rolesId,
    }
  });

  res.status(200).json(updatedUser);
}

// Supprimer un utilisateur
export async function deleteUser(req: Request, res: Response) {
  const userId = await parseIdFromParams(req.params.id);
  await prisma.user.delete({
    where: { id: userId }
  });
  res.status(204).send();
}