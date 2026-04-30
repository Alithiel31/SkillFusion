import { Router } from "express";
import usersController from "../controllers/users.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { checkRoles, requireSelfOrAdmin, roles } from "../middlewares/rbac.middleware";

export const router = Router();


// GET - Accessible à STUDENT, TEACHER, ADMIN
router.get("/users", verifyToken, checkRoles([roles.student, roles.instructor, roles.admin]), usersController.getAllUsers);

// GET export - Juste vérifier le token
router.get("/users/me/export", verifyToken, usersController.exportMyData);

// GET :id - Accessible à STUDENT, TEACHER, ADMIN
router.get("/users/:id", verifyToken, checkRoles([roles.student, roles.instructor, roles.admin]), usersController.getUserById);

// POST - ADMIN only
router.post("/users", verifyToken, checkRoles([roles.admin]), usersController.createUser);

// PATCH - self ou ADMIN
router.patch("/users/:id", verifyToken, requireSelfOrAdmin, usersController.updateUser);

// DELETE - self ou ADMIN
router.delete("/users/:id", verifyToken, requireSelfOrAdmin, usersController.deleteUser);

router.delete("/users/me", verifyToken, usersController.deleteMyAccount);
