const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    id: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
