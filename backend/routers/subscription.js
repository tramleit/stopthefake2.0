const express = require("express");
const authMiddleware = require("../middlewares/auth");
const subscriptionController = require("../controllers/subscription");
const router = express.Router();

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.post("/", authMiddleware.verify, subscriptionController.stripePay);
router.post("/credits", authMiddleware.verify, subscriptionController.credits);

module.exports = router;
