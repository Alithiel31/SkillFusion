import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";

export default {
    // Requête pour récuperer tous les contenus de cours
    getAll: async (req: Request, res: Response) => {
        const courContents = await prisma.courContent.findMany();
        res.json(courContents);
    },

    // Requête pour récuperer un contenu de cours par son id
    getOneCourContent: async (req: Request, res: Response) => {
        const courContentId = await parseIdFromParams(req.params.id);
        const courContent = await prisma.courContent.findUnique({ where: { id: courContentId } });
        if (!courContent) {
            throw new NotFoundError(`CourContent with id ${courContentId} not found`);
        }
        res.json(courContent);
    },

     // Requête pour créer un contenu de cours
     createCourContent: async (req: Request, res: Response) => {
        const createCourContentBodySchema = z.object({
            content: z.string().min(1),
            numberPage: z.number().min(1).int(),
            coursId: z.number(). int(),
        });
        const data = await createCourContentBodySchema.parseAsync(req.body);

        const createdCourContent = await prisma.courContent.create({
            data: {
                content: data.content,
                numberPage: data.numberPage,
                coursId: data.coursId,
            }
        });
        res.status(201).json(createdCourContent);
    },

     // Requête pour mettre à jour un contenu de cours
     updatingCourContent: async (req: Request, res: Response) => {
        const courContentId = await parseIdFromParams(req.params);
        const updateCourContentBodySchema = z.object({
            content: z.string().min(1).optional(),
            numberPage: z.number().min(1).int().optional(),
            coursId: z.number().int().optional(),
        });
        const { content, numberPage, coursId } = await updateCourContentBodySchema.parseAsync(req.body);

        const updatedCourContent = await prisma.courContent.update({
            where: { id: courContentId },
            data: {
                content,
                numberPage,
                coursId,
            }
        });
        res.json(updatedCourContent);
    },

     // Requête pour supprimer un contenu de cours
     deleteCourContent: async (req: Request, res: Response) => {
        const courContentId = await parseIdFromParams(req.params.id);
        await prisma.courContent.delete({ where: { id: courContentId } });
        res.status(204).send();
    },
}