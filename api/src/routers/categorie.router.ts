import express from "express";
import categorieController from "../controllers/categorie.controller";
import { verifyToken } from '../middlewares/auth.middleware';
import { checkRoles, roles } from '../middlewares/rbac.middleware';

const router = express.Router();

// Route public
router.get("/categories", categorieController.getAll)
router.get("/categories/:id", categorieController.getOneCategorie)

// Route dédié à l'admin (selon les User Stories)
router.post("/categories", verifyToken, checkRoles([roles.admin]), categorieController.createCategorie)
router.patch("/categories/:id", verifyToken, checkRoles([roles.admin]), categorieController.updatingCategorie)
router.delete("/categories/:id", verifyToken, checkRoles([roles.admin]), categorieController.deleteCategorie)

export default router;