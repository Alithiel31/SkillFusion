import { Router } from "express";
import * as usersController from "../controlleurs/users.controller.js";
export const router = Router();

router.get("/users", usersController.getAllUsers);
