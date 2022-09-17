const express = require("express");
const dashController = require("../controllers/dashboard");
const authMiddleware = require("../middlewares/auth");

const router = express();

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.get("/", authMiddleware.verify, dashController.dashboardStats);

module.exports = router;
