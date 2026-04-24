import { Router } from "express";
import * as usersController from "../controlleurs/users.controller.js";
export const router = Router();
import { verifyToken } from "../middlewares/auth.middleware";

router.get("/users", usersController.getAllUsers);
router.get("/users/me/export", verifyToken, usersController.exportMyData);