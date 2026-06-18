const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

module.exports = router;