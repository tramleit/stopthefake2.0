const fs = require("fs");
const mongoose = require("mongoose");

const Category = require("../models/category");
const Product = require("../models/product");
const Image = require("../models/image");
const User = require("../models/user");

const { email } = require("../utils/mailer");

module.exports.homepageProducts = async (req, res, next) => {
  const dt = new Date();

  const products = await Product.aggregate()
    .lookup({
      from: "images",
      localField: "_id",
      foreignField: "productId",
      as: "images",
    })
    .match({
      time_to_check: { $not: { $gt: dt } },
      deleted: { $ne: true },
    })
    .sort({ checked_at: -1 })
    .limit(8);

  res.status(200).json(products);
};

module.exports.products = async (req, res, next) => {
  const dt = new Date();
  const page = req.query.page || 1;

  const productsCount = await Product.find({
    time_to_check: { $not: { $gt: dt } },
    deleted: { $ne: true },
  }).countDocuments();

  const products = await Product.aggregate()
    .match({
      time_to_check: { $not: { $gt: dt } },
      deleted: { $ne: true },
    })
    .sort({ checked_at: -1 })
    .skip((page - 1) * 16)
    .limit(16)
    .lookup({
      from: "images",
      localField: "_id",
      foreignField: "productId",
      as: "images",
    });

  // await Product.find({
  //   time_to_check: { $not: { $gt: dt } },
  // })
  //   .skip((page - 1) * 16)
  //   .limit(16)
  //   .sort({ checked_at: -1 })
  //   .then(
  //     (resp) => {},
  //     (err) => next(err)
  //   )
  //   .catch((err) => next(err));

  res.status(200).json({ count: productsCount, data: products });
};

module.exports.adminProducts = async (req, res, next) => {
  // const dt = new Date();
  const page = req.query.page || 1;

  const productsCount = await Product.find({
    deleted: { $ne: true },
  }).countDocuments();

  // await Product.find()
  //   .skip((page - 1) * 12)
  //   .limit(12)
  //   .sort({ _id: -1 })
  //   .then(
  //     (resp) => {
  //     },
  //     (err) => next(err)
  //   )
  //   .catch((err) => next(err));

  const products = await Product.aggregate()
    .match({
      deleted: { $ne: true },
    })
    .sort({ checked_at: -1 })
    .skip((page - 1) * 12)
    .limit(12)
    .lookup({
      from: "images",
      localField: "_id",
      foreignField: "productId",
      as: "images",
    });
  res.status(200).json({ count: productsCount, data: products });
};

module.exports.userProducts = async (req, res, next) => {
  const dt = new Date();
  const id = req.params.userId;
  const page = req.query.page || 1;

  const productsCount = await Product.find({
    userId: id,
    time_to_check: { $not: { $gt: dt } },
    deleted: { $ne: true },
  }).countDocuments();

  // const products = await Product.find({
  //   userId: id,
  //   time_to_check: { $not: { $gt: dt } },
  // })
  //   .skip((page - 1) * 16)
  //   .limit(16)
  //   .sort({ checked_at: -1 });
  const products = await Product.aggregate()
    .match({
      userId: mongoose.Types.ObjectId(id),
      time_to_check: { $not: { $gt: dt } },
      deleted: { $ne: true },
    })
    .sort({ checked_at: -1 })
    .skip((page - 1) * 16)
    .limit(16)
    .lookup({
      from: "images",
      localField: "_id",
      foreignField: "productId",
      as: "images",
    });
  res.status(200).json({ count: productsCount, data: products });
};

module.exports.singleProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;

  await Product.findById(id)
    .populate("categoryId")
    .then(async (resp) => {
      product = resp;
      return await Image.find({ productId: id });
    })
    .then((resp) => {
      if (resp) {
        const pro = { ...product._doc, images: resp };
        res.status(200).json(pro);
      }
    })
    .catch((err) => next(err));
};

module.exports.create = async (req, res, next) => {
  const dt = new Date();
  const dt2 = new Date();
  const slug =
    req.body.title.split(" ").join("-") +
    "-" +
    dt.getTime().toString().toLocaleLowerCase();
  const tm = req.body.timer.name;
  const dt_to_check =
    tm === "30 min"
      ? dt2.setMinutes(dt.getMinutes() + 30)
      : tm === "15 min"
      ? dt2.setMinutes(dt.getMinutes() + 15)
      : tm === "3 hours"
      ? dt2.setHours(dt.getHours() + 3)
      : null;

  // console.log(dt);
  // console.log(dt2);

  const timeout =
    tm === "30 min"
      ? 30 * 60 * 1000
      : tm === "15 min"
      ? 15 * 60 * 1000
      : tm === "3 hours"
      ? 3 * 60 * 60 * 1000
      : null;

  // console.log(timeout);

  await Category.findOne({ id: req.body.category.id })
    .then(async (resp) => {
      return await Product.create({
        title: req.body.title,
        brand: req.body.brand,
        link: req.body.link,
        checked_at: dt,
        time_to_check: dt2,
        slug: slug,
        remark: req.body.remarks,
        userId: req.user._id,
        categoryId: resp._id,
      });
    })
    .then(async (resp) => {
      if (resp) {
        let filesObj = [];
        const files = req.body.files;
        files.map(async (file, index) => {
          await Image.create({
            image: file.filename,
            productId: resp._id,
          }).then((resp1) => {
            filesObj = [...filesObj, resp1];
          });
        });

        const credits = req.user.credit - req.body.timer.tokens;
        req.user = await User.findByIdAndUpdate(
          req.user._id,
          { credit: credits },
          { new: true }
        );

        setTimeout(() => {
          console.log(
            "Hello " +
              req.user.name +
              " " +
              req.user.surname +
              " ! Your result is ready."
          );
          email(
            req.user.email,
            "Legit-Check Certificate",
            "",
            `<!DOCTYPE html><html></html>`
          );
        }, timeout);

        email(
          "stopthefake.test@gmail.com",
          "Legit-Check Request",
          "Name: " +
            resp.title +
            ", Brand: " +
            resp.brand +
            ", Remarks: " +
            resp.remark +
            " | By: " +
            req.user?.name +
            " " +
            req.user?.surname
        );

        res.status(200).json({
          message: "Request sent successfully. You will be notified via email.",
          credits: req.user.credit,
        });
      }
    })
    .catch((err) => next(err));
};

module.exports.removeFile = async (req, res, next) => {
  const filename = req.body.filename;
  const files = req.body.files;

  const filteredFiles = files.filter((file) => file.filename !== filename);

  fs.unlink("./public/images/" + filename, (err) => {
    console.log(filename);
  });

  res.status(200).json({ files: filteredFiles });
};

module.exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  await Product.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      brand: req.body.brand,
      link: req.body.link,
      remark: req.body.remark,
      comment: req.body.comment,
      is_informed: true,
      status: req.body.status,
    },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => next(err));
};

module.exports.searchProduct = async (req, res) => {
  const value = req.body.searchInput;

  const isId = mongoose.Types.ObjectId.isValid(value);
  const page = req.params.page || 1;
  const dt = new Date();

  let query;
  if (value === "") {
    const productsCount = await Product.find({
      time_to_check: { $not: { $gt: dt } },
      deleted: { $ne: true },
    }).countDocuments();

    const products = await Product.aggregate()
      .match({
        time_to_check: { $not: { $gt: dt } },
        deleted: { $ne: true },
      })
      .sort({ checked_at: -1 })
      .skip((page - 1) * 16)
      .limit(16)
      .lookup({
        from: "images",
        localField: "_id",
        foreignField: "productId",
        as: "images",
      });

    res.status(200).json({ count: productsCount, data: products });
  } else {
    if (isId) {
      query = {
        _id: mongoose.Types.ObjectId(value),
        time_to_check: { $not: { $gt: dt } },
        deleted: { $ne: true },
      };
    } else {
      query = {
        title: { $regex: `.*${value}.*`, $options: "i" },
        time_to_check: { $not: { $gt: dt } },
        deleted: { $ne: true },
      };
    }
    const productsCount = await Product.find(query).countDocuments();

    const products = await Product.aggregate()
      .match(query)
      .sort({ checked_at: -1 })
      .skip((page - 1) * 16)
      .limit(16)
      .lookup({
        from: "images",
        localField: "_id",
        foreignField: "productId",
        as: "images",
      });
    res.status(200).json({ count: productsCount, data: products });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndUpdate(id, { deleted: true }, { new: true });

  res.status(200).json({ message: "Legit check deleted successfully." });
};
