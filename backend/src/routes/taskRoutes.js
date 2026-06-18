const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  taskValidation,
} = require("../validators/taskValidator");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin", "Manager", "Employee"),
  taskValidation,
  createTask
);

router.get(
  "/",
  authMiddleware,
  getTasks
);

router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "Manager", "Employee"),
  taskValidation,
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin", "Manager", "Employee"),
  deleteTask
);

module.exports = router;