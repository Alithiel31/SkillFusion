import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
export const router = Router();
import { verifyToken } from "../middlewares/auth.middleware";

router.get("/users", usersController.getAllUsers);
router.get("/users/me/export", verifyToken, usersController.exportMyData);
router.get("/users/:id", usersController.getUserById);

router.post("/users", usersController.createUser);

router.patch("/users/:id", usersController.updateUser);

router.delete("/users/:id", usersController.deleteUser);

export default router;