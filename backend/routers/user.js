const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/user");
const { uploadAvatars } = require("../utils/uploader");

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.get("/", authMiddleware.verify, userController.getUsers);
router.put("/:id", authMiddleware.verify, userController.updateUser);
router.put("/admin/:id", authMiddleware.verify, userController.updateAdminUser);
router.get("/:id", authMiddleware.verify, userController.getUser);
router.post(
  "/upload",
  authMiddleware.verify,
  uploadAvatars.single("avatar"),
  (req, res) => {
    res.status(200).json(req.file);
  }
);

module.exports = router;
