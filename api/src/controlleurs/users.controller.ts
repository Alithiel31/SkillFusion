import type { Request, Response } from "express";
import { prisma } from "../models/client"

export async function getAllUsers(req: Request, res: Response) {
  // Requête pour la BDD
  const users = await prisma.user.findMany({
    omit: { password: true }
  });
  // Réponse envoyé coté client
  res.json(users);
}
