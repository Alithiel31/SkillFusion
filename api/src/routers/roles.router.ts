import express from 'express';
import rolesController from '../controllers/roles.controller';

const router = express.Router();

router.get("/roles", rolesController.getAll)
router.get("/roles/:id", rolesController.getOneRoles)
router.post("/roles", rolesController.createRoles)
router.patch("/roles/:id", rolesController.updateRoles)
router.delete("/roles/:id", rolesController.deleteRoles)

export default router;  