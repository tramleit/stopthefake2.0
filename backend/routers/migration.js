const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const User = require("../models/user");
const Category = require("../models/category");
const Image = require("../models/image");
const Payment = require("../models/payment");
const Package = require("../models/package");

router.get("/products", async (req, res, next) => {
  await Product.find()
    .then((resp) => {
      resp.map(async (pro, index) => {
        await User.findOne({ id: pro.user_id })
          .then(async (res1) => {
            await pro.updateOne({ userId: res1._id });
            console.log(index + ": " + "userId added in product-" + pro.id);
          })
          .catch((err) => next(err));
        await Category.findOne({ id: pro.category_id })
          .then(async (res2) => {
            await pro.updateOne({ categoryId: res2._id });
            console.log(index + ": " + "categoryId added in product-" + pro.id);
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
});

router.get("/images", async (req, res, next) => {
  await Image.find()
    .then((resp) => {
      resp.map(async (img, index) => {
        await Product.findOne({ id: img.product_id })
          .then(async (resp) => {
            await img.updateOne({ productId: resp._id });
            console.log(index + ": " + img.id + " corrected.");
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
});

router.get("/payments", async (req, res, next) => {
  await Payment.find()
    .then((resp) => {
      resp.map(async (pay, index) => {
        await User.findOne({ id: pay.user_id })
          .then(async (res1) => {
            await pay.updateOne({ userId: res1._id });
            console.log(index + ": " + "userId added in payment-" + pay.id);
          })
          .catch((err) => next(err));
        await Package.findOne({ id: pay.package_id })
          .then(async (res2) => {
            await pay.updateOne({ packageId: res2._id });
            console.log(index + ": " + "packageId added in payment-" + pay.id);
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
