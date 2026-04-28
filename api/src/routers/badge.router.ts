import express from 'express';
import badgeController from '../controllers/badge.controller';

const router = express.Router();

router.get("/badges", badgeController.getAll)
router.get("/badges/:id", badgeController.getOneBadge)

router.post("/badges", badgeController.createBadge)

router.patch("/badges/:id", badgeController.updatingBadge)

router.delete("/badges/:id", badgeController.deleteBadge)

export default router;