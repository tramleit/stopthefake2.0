const express = require("express");

const authValidator = require("../validators/auth");
const authController = require("../controllers/auth");

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Not authenticated." });
  }
};

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.post("/login", authValidator.login, authController.login);
router.post("/register", authValidator.register, authController.register);
router.post(
  "/forgot-password",
  authValidator.forgorPassword,
  authController.forgotPassword
);
router.post(
  "/reset-password",
  authValidator.resetPAssword,
  authController.resetPassword
);
router.get("/google/user", isAuthenticated, authController.googleAuthUser);

module.exports = router;
