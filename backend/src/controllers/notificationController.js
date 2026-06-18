const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
  const notification = await Notification.create({
    user: req.body.user,
    message: req.body.message,
  });

  res.status(201).json({
    success: true,
    notification,
  });
};

const getNotifications = async (req, res) => {
  const notifications = await Notification.find()
    .populate("user", "name email role");

  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications,
  });
};

const markAsRead = async (req, res) => {
  const notification =
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  res.status(200).json({
    success: true,
    notification,
  });
};

const deleteNotification = async (req, res) => {
  const notification =
    await Notification.findByIdAndDelete(
      req.params.id
    );

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  res.status(200).json({
    success: true,
    message:
      "Notification deleted successfully",
  });
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};