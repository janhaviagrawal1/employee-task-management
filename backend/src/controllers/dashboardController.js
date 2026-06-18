const User = require("../models/User");
const Task = require("../models/Task");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const getDashboard = async (req, res) => {
  const role = req.user.role;

  if (role === "Admin") {
    const users = await User.countDocuments();
    const tasks = await Task.countDocuments();
    const comments = await Comment.countDocuments();
    const notifications =
      await Notification.countDocuments();

    return res.status(200).json({
      success: true,
      role: "Admin",
      dashboard: {
        totalUsers: users,
        totalTasks: tasks,
        totalComments: comments,
        totalNotifications: notifications,
      },
    });
  }

  if (role === "Manager") {
    const tasks = await Task.countDocuments();

    return res.status(200).json({
      success: true,
      role: "Manager",
      dashboard: {
        totalTasks: tasks,
      },
    });
  }

  const myTasks = await Task.countDocuments({
    assignedTo: req.user._id,
  });

  return res.status(200).json({
    success: true,
    role: "Employee",
    dashboard: {
      myTasks,
    },
  });
};

module.exports = {
  getDashboard,
};