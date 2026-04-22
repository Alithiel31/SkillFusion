import { Router } from "express";
import * as usersController from "../controlleurs/users.controller";
export const router = Router();

router.get("/users", usersController.getAllUsers);
