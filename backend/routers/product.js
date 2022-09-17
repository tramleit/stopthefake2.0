const express = require("express");
const router = express.Router();
const multer = require("multer");

const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");
const { uploadImages } = require("../utils/uploader");

router.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
});

router.get("/homepage", productController.homepageProducts);
router.get("/", productController.products);
router.get("/admin", authMiddleware.verify, productController.adminProducts);
router.get("/:userId", authMiddleware.verify, productController.userProducts);
router.get("/legit-check/:id", productController.singleProduct);
router.post(
  "/upload",
  authMiddleware.verify,
  uploadImages.array("product_images"),
  (req, res) => {
    res.status(200).json(req.files);
  }
);
router.post("/create", authMiddleware.verify, productController.create);
router.post("/remove-file", productController.removeFile);
router.put(
  "/legit-check/:id",
  authMiddleware.verify,
  productController.updateProduct
);
router.post("/search", productController.searchProduct);
router.delete("/:id", authMiddleware.verify, productController.deleteProduct);

module.exports = router;
