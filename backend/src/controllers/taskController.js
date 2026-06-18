const Task = require("../models/Task");
const { validationResult } = require("express-validator");

const createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const task = await Task.create({
    ...req.body,
    assignedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    task,
  });
};

const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name email role")
    .populate("assignedBy", "name email role");

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    task,
  });
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    task,
  });
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(
    req.params.id
  );

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};