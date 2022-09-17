const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: false,
    },
    category_id: {
      type: Number,
      required: false,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user_id: {
      type: Number,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    remark: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    checked_at: {
      type: Date,
      required: true,
    },
    is_readed: {
      type: Boolean,
      required: true,
      default: false,
    },
    time_to_check: {
      type: Date,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    is_informed: {
      type: Boolean,
      required: true,
      default: false,
    },
    comment: {
      type: String,
      required: false,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
