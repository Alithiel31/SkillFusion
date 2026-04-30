import type { Request, Response } from "express"
import { prisma } from "../models/client"
import z from "zod";
import { parseIdFromParams } from "./utils";
import { ConflictError, NotFoundError } from "../lib/errors";


export default {
    getAll: async (req: Request, res: Response) => {
        let data = null
        if (req.query.slug) {
            const cours = await prisma.cours.findMany({
                where: { slug: { contains: req.query.slug as string } },
                include: {
                    category: true,
                    author: {
                        omit: { password: true }
                    },
                    learningObjectives: {
                        include: { objectif: true }
                    },
                    content: true,
                    tools: {
                        include: { tools: true }
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true }
                            }
                        }
                    }
                }
            })
            data = cours[0]
        }else if (req.query.visibility){
            const cours = await prisma.cours.findMany({
                where: { visibility:true},
                include: {
                    category: true,
                    author: {
                        omit: { password: true }
                    },
                    learningObjectives: {
                        include: { objectif: true }
                    },
                    content: true,
                    tools: {
                        include: { tools: true }
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true }
                            }
                        }
                    }
                }
            })
            data = cours
        }

        else {
            const cours = await prisma.cours.findMany({
                include: {
                    category: true,
                    author: {
                        omit: { password: true }
                    },
                    learningObjectives: {
                        include: { objectif: true }
                    },
                    tools: {
                        include: { tools: true }
                    },
                    opinions: {
                        include: {
                            user: {
                                omit: { password: true }
                            }
                        }
                    }
                }
            })
            data = cours
        }
        res.json(data)
    },
    getCoursByInstructor: async (req: Request, res: Response) => {
        const userId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findMany(
            {
                where: { authorId: userId },
                include: { category: true,author: true }
            })
        if (!cours) {
            throw new NotFoundError(`Cours from ${userId} not found`);
        }
        res.json(cours);
    },
    // Requête pour récuperer les cours récents
    getForHomePage: async (req: Request, res: Response) => {
        const cours = await prisma.cours.findMany({
            where:{visibility:true},
            include: { category: true },
            orderBy: { createdAt: "desc" },
        })
        res.json(cours)
    },
    // Requête pour créer un cours
    createCours: async (req: Request, res: Response) => {
        const createCoursBodySchema = z.object({
            title: z.string().min(1),
            littleSummary: z.string().optional(),
            urlImage: z.string().optional(),
            difficulty: z.number().int().min(0).max(4),
            summary: z.string().optional(),
            visibility: z.boolean(),
            authorId: z.number().int(),
            categoryId: z.number().int(),
            tools: z.array(z.number().int()),
            learningObjectives: z.array(z.number().int()),
            content: z.array(z.number().int()),
            enrollments: z.array(z.number().int()),
            activations: z.array(z.number().int()),
            comments: z.array(z.number().int()),
            opinions: z.array(z.number().int()),
            notifications: z.array(z.number().int()),
        });
        const data = await createCoursBodySchema.parseAsync(req.body);

        const alreadyExistingCours = await prisma.cours.findFirst({ where: { title: data.title } });
        if (alreadyExistingCours) { throw new ConflictError(`Title name already taken : ${data.title}`); }

        const createdCours = await prisma.cours.create({
            data: {
                title: data.title,
                littleSummary: data.littleSummary,
                urlImage: data.urlImage,
                difficulty: data.difficulty,
                summary: data.summary,
                visibility: data.visibility,
                authorId: data.authorId,
                categoryId: data.categoryId
            }
        });
        res.status(201).json(createdCours);
    },
    //Recuperer un cours par son id
    getOneCours: async (req: Request, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) { throw new NotFoundError("Cours not found"); }
        res.json(cours);
    },
    //Suprimer un cours par son id
    deleteCours: async (req: Request, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) { throw new NotFoundError("Cours not found"); }

        await prisma.cours.delete({ where: { id: coursId } });

        res.status(204).end();
    },
    // Requête pour modifier un cours
    updatingCours: async (req: Request, res: Response) => {
        const coursId = await parseIdFromParams(req.params.id);
        const updateCoursBodyScheme = z.object({
            title: z.string().min(1),
            littleSummary: z.string().optional(),
            urlImage: z.string().optional(),
            difficulty: z.number().int().min(0).max(4),
            summary: z.string().optional(),
            visibility: z.boolean(),
            authorId: z.number().int(),
            categoryId: z.number().int(),
            tools: z.array(z.number().int()),
            learningObjectives: z.array(z.number().int()),
            content: z.array(z.number().int()),
            enrollments: z.array(z.number().int()),
            activations: z.array(z.number().int()),
            comments: z.array(z.number().int()),
            opinions: z.array(z.number().int()),
            notifications: z.array(z.number().int()),
        });
        const {
            title,
            littleSummary,
            urlImage,
            difficulty,
            summary,
            visibility,
            authorId,
            categoryId }
            = await updateCoursBodyScheme.parseAsync(req.body);

        const cours = await prisma.cours.findUnique({ where: { id: coursId } });
        if (!cours) { throw new NotFoundError("Cours not found"); }

        const alreadyExistingCours = await prisma.cours.findFirst({ where: { title: title } });
        if (alreadyExistingCours) { throw new ConflictError(`Title name already taken : ${title}`); }


        // SHOULD TO DO ? 
        // if (req.user?.role !== "admin") { throw new UnauthorizedError('Not autorisation'); }
        // else if (req.user?.role !== "author" && req.user?.id !== quiz.user_id) { throw new UnauthorizedError('Not autorisation'); }

        const updatedCours = await prisma.cours.update({
            where: { id: coursId },
            data: {
                title,
                littleSummary,
                urlImage,
                difficulty,
                summary,
                visibility,
                authorId,
                categoryId,
                updatedAt: new Date()
            }
        })
        res.json(updatedCours)
    },
    changeVisibility:async (req: Request, res: Response)=>{
        const coursId = await parseIdFromParams(req.params.id);
        const cours= await prisma.cours.findFirst({where:{id:coursId}})
        if(cours){
            await prisma.cours.update({where:{id:coursId},data:{visibility:!cours.visibility}})
            return res.status(204).end()
        }
        res.status(400).end()
    }
}