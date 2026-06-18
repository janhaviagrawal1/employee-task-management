const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  const comment = await Comment.create({
    task: req.body.task,
    comment: req.body.comment,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    comment,
  });
};

const getComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "name email")
    .populate("task", "title");

  res.status(200).json({
    success: true,
    count: comments.length,
    comments,
  });
};

const updateComment = async (req, res) => {
  const comment =
    await Comment.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
      },
      {
        new: true,
      }
    );

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  res.status(200).json({
    success: true,
    comment,
  });
};

const deleteComment = async (req, res) => {
  const comment =
    await Comment.findByIdAndDelete(
      req.params.id
    );

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  res.status(200).json({
    success: true,
    message:
      "Comment deleted successfully",
  });
};

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};