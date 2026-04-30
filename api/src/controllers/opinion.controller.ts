import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";

export default {
    // Requête pour récuperer toutes les opinions
    getAll: async (req: Request, res: Response) => {
        const opinions = await prisma.opinion.findMany();
        res.json(opinions);
    },
// Requête pour récuperer une opinion pour un  utilisateur
    getByUser:async (req: Request, res: Response) => {
        const coursId=await parseIdFromParams(req.params.coursId);
        const userId = await parseIdFromParams(req.params.id);
        const opinion = await prisma.opinion.findFirst({where: {userId:userId, coursId: coursId }})   
        if (!opinion) {
           return res.json({IsOpinionExisting:false})
        }
       res.json({IsOpinionExisting:true, opinion: opinion})
    },

    // Requête pour récuperer une opinion par son id
    getOneOpinion: async (req: Request, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        const opinion = await prisma.opinion.findUnique({ where: { id: opinionId } });
        if (!opinion) {
            throw new NotFoundError(`Opinion with id ${opinionId} not found`);
        }
        res.json(opinion);
    },

    // Requête pour créer une opinion
    createOpinion: async (req: Request, res: Response) => {
        const createOpinionBodySchema = z.object({
            content: z.string().min(1),
            note: z.number().min(0).max(5).int(),
            coursId: z.number(),
            userId: z.number(),
        });
        const data = await createOpinionBodySchema.parseAsync(req.body);

        const createdOpinion = await prisma.opinion.create({
            data: {
                content: data.content,
                note: data.note,
                coursId: data.coursId,
                userId: data.userId,
            }
        });
          const alreadyExistingOpinion = await prisma.coursActived.findFirst({ where: { coursId: data.coursId, userId: data.userId } });
        if (alreadyExistingOpinion) {
            return res.status(204).end()
        }
        res.status(201).json(createdOpinion);

    },

    // Requête pour mettre à jour une opinion
    updateOpinion: async (req: Request, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        const updateOpinionBodySchema = z.object({
            content: z.string().min(1).optional(),
            note: z.number().min(0).max(5).int().optional(),
            coursId: z.number(),
            userId: z.number(),
        });
        const data = await updateOpinionBodySchema.parseAsync(req.body);
        const updatedOpinion = await prisma.opinion.update({
            where: { id: opinionId },
            data: {
                content: data.content,
                note: data.note,
                coursId: data.coursId,
                userId: data.userId,
            }
        });
        res.json(updatedOpinion);
    },

    // Requête pour supprimer une opinion
    deleteOpinion: async (req: Request, res: Response) => {
        const opinionId = await parseIdFromParams(req.params.id);
        await prisma.opinion.delete({ where: { id: opinionId } });
        res.status(204).send();
    },
};