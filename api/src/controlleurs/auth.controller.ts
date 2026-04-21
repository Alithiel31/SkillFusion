import type { Request,Response } from "express"

export default {
    register: (req:Request,res:Response) =>{
        res.send("ok")
    },
    login: (req:Request,res:Response) =>{
        res.send("ok")
    },
    logout: (req:Request,res:Response) =>{
        res.send("ok")
    },
    refresh: (req:Request,res:Response) =>{
        res.send("ok")
    },
    me: (req:Request,res:Response) =>{
        res.send("ok")
    },

}