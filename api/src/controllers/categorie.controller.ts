import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";
import { AuthenticatedRequest } from "../@types/express";

export default {
    // Requête pour récuperer toutes les catégories
    getAll: async (req: Request, res: Response) => {
        const categories = await prisma.category.findMany();
        res.json(categories);
    },

    // Requête pour récuperer une catégorie par son id
    getOneCategorie: async (req: Request, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }
        res.json(category);
    },

    // Requête pour créer une catégorie
    createCategorie: async (req: AuthenticatedRequest, res: Response) => {
        const createCategoryBodySchema = z.object({
            name: z.string().min(1),
            description: z.string().optional(),
            textColor: z.string(),
            borderColor: z.string(),
        });
        const data = await createCategoryBodySchema.parseAsync(req.body);

        const alreadyExistingCategory = await prisma.category.findFirst({ where: { name: data.name } });
        if (alreadyExistingCategory) {
            throw new ConflictError(`Category name already taken : ${data.name}`);
        }

        const createdCategory = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                textColor: data.textColor,
                borderColor: data.borderColor,
            }
        });
        res.status(201).json(createdCategory);
    },

    // Requête pour mettre à jour une catégorie
    updatingCategorie: async (req: AuthenticatedRequest, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const updateCategoryBodySchema = z.object({
            name: z.string().min(1).optional(),
            description: z.string().optional(),
            textColor: z.string(),
            borderColor: z.string(),
        });
        const { name, description, textColor, borderColor } = await updateCategoryBodySchema.parseAsync(req.body);

        const categoryToUpdate = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!categoryToUpdate) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        const alreadyExistingCategory = await prisma.category.findFirst({ where:{ name: name } });
        if (alreadyExistingCategory) {
            throw new ConflictError(`Category name already taken : ${name}`);
        }


        const updatedCategory = await prisma.category.update({
            where: { id: categoryId },
            data: {
                name: name ?? categoryToUpdate.name,
                description: description ?? categoryToUpdate.description,
                textColor: textColor ?? categoryToUpdate.textColor,
                borderColor: borderColor ?? categoryToUpdate.borderColor,
            }
        });
        res.json(updatedCategory);
    },

    // Requête pour supprimer une catégorie
    deleteCategorie: async (req: Request, res: Response) => {
        const categoryId = await parseIdFromParams(req.params.id);
        const categoryToDelete = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!categoryToDelete) {
            throw new NotFoundError(`Category with id ${categoryId} not found`);
        }

        await prisma.category.delete({ where: { id: categoryId } });
        res.status(204).end();
    },
}