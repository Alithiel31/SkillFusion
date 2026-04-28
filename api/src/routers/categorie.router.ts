import express from "express";
import categorieController from "../controllers/categorie.controller";

const router = express.Router();

router.get("/categories", categorieController.getAll)
router.get("/categories/:id", categorieController.getOneCategorie)

router.post("/categories", categorieController.createCategorie)

router.patch("/categories/:id", categorieController.updatingCategorie)

router.delete("/categories/:id", categorieController.deleteCategorie)

export default router;