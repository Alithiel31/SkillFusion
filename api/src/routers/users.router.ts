import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/auth.middleware";

export const router = Router();

router.get("/users", usersController.getAllUsers);
router.get("/users/me/export", verifyToken, usersController.exportMyData);
router.delete("/users/me", verifyToken, usersController.deleteMyAccount);
