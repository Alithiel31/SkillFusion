import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";
import { id } from "zod/v4/locales";

export default {
    // Requête pour récuperer tous les cours actives
    getAll: async (req: Request, res: Response) => {
        const coursActives = await prisma.coursActived.findMany();
        res.json(coursActives);

    },

    getByUser: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const coursByUser = await prisma.coursActived.findMany({
            where: { userId: userId },
            include: { cours: {include: {category: true}},
    }})
        if (!coursByUser) {
            throw new NotFoundError(`Cours active with id ${coursByUser} not found`);
        }
        console.log(coursByUser[0].cours.category.backgroundColor)
        res.json(coursByUser);
    },
    // Requête pour récuperer un cours active par son id
    getOneCoursActive: async (req: Request, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);
        const coursActive = await prisma.coursActived.findUnique({ where: { id: coursActiveId } });
        if (!coursActive) {
            throw new NotFoundError(`Cours active with id ${coursActiveId} not found`);
        }
        res.json(coursActive);
    },

    // Requête pour créer un cours active
    createCoursActive: async (req: Request, res: Response) => {
        const createCoursActiveBodySchema = z.object({
            coursId: z.number(),
            userId: z.number(),
            IsEnd: z.boolean(),
        });
        const data = await createCoursActiveBodySchema.parseAsync(req.body);

        const createdCoursActive = await prisma.coursActived.create({
            data: {
                coursId: data.coursId,
                userId: data.userId,
                IsEnd: data.IsEnd,
            }
        });
        res.status(201).json(createdCoursActive);
    },

    // Requête pour mettre à jour un cours active
    updatingCoursActive: async (req: Request, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);
        const updateCoursActiveBodySchema = z.object({
            coursId: z.number(),
            userId: z.number(),
            IsEnd: z.boolean(),
        });
        const { coursId, userId, IsEnd } = await updateCoursActiveBodySchema.parseAsync(req.body);

        const updatedCoursActive = await prisma.coursActived.update({
            where: { id: coursActiveId },
            data: {
                coursId,
                userId,
                IsEnd,
            }
        });
        res.json(updatedCoursActive);
    },

    // Requête pour supprimer un cours active
    deleteCoursActive: async (req: Request, res: Response) => {
        const coursActiveId = await parseIdFromParams(req.params.id);
        await prisma.coursActived.delete({ where: { id: coursActiveId } });
        res.status(204).send();
    },

}