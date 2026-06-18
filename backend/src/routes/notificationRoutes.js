const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.post(
  "/",
  authMiddleware,
  createNotification
);

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

module.exports = router;