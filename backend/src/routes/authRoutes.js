const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const {
  registerValidation,
} = require("../validators/authValidator");

const authMiddleware = require(
  "../middlewares/authMiddleware"
);

router.post(
  "/register",
  registerValidation,
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  authMiddleware,
  logoutUser
);

module.exports = router;