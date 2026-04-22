import { Role } from "../models/index";
import { Request } from "express";


export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: Role;
  };
}

