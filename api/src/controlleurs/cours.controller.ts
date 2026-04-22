import type { Request,Response } from "express"
import { prisma } from "../models/client"

export default {
    getAll: async  (req:Request,res:Response) =>{
        const cours = await prisma.cours.findMany()
        res.json(cours)
    }
}