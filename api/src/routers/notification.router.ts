import express from 'express';
import notificationController from '../controlleurs/notification.controller';

const router = express.Router();

router.get("/notifications", notificationController.getAll)
router.get("/notifications/:id", notificationController.getOneNotification)

router.post("/notifications", notificationController.createNotification)

router.patch("/notifications/:id", notificationController.updatingNotification)

router.delete("/notifications/:id", notificationController.deleteNotification)

export default router;