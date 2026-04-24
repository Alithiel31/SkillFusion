import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";

export default {
    // Requête pour récuperer tous les commentaires
    getAll: async (req: Request, res: Response) => {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    },

    // Requête pour récuperer un commentaire par son id
    getOneComment: async (req: Request, res: Response) => {
        const commentId = await parseIdFromParams(req.params.id);
        const comment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment) {
            throw new NotFoundError(`Comment with id ${commentId} not found`);
        }
        res.json(comment);
    },

    // Requête pour créer un commentaire
    createComment: async (req: Request, res: Response) => {
        const createCommentBodySchema = z.object({
            description: z.string().min(1),
            authorId: z.number(),
            coursId: z.number(),
        });
        const data = await createCommentBodySchema.parseAsync(req.body);

        const createdComment = await prisma.comment.create({
            data: {
                description: data.description,
                authorId: data.authorId,
                coursId: data.coursId,
            }
        });
        res.status(201).json(createdComment);
    },

    // Requête pour mettre à jour un commentaire
    updatingComment: async (req: Request, res: Response) => {
        const commentId = await parseIdFromParams(req.params);
        const updateCommentBodySchema = z.object({
            content: z.string().min(1).optional(),
        });
        const { content } = await updateCommentBodySchema.parseAsync(req.body);

        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: {
                description: content,
            }
        });
        res.json(updatedComment);
    },

    // Requête pour supprimer un commentaire
    deleteComment: async (req: Request, res: Response) => {
        const commentId = await parseIdFromParams(req.params.id);
        await prisma.comment.delete({ where: { id: commentId } });
        res.status(204).send();
    },
};