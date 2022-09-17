const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
      default: "avatar.png",
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    credit: {
      type: Number,
      required: true,
      default: 0,
    },
    roles: {
      type: String,
      required: true,
      default: `["ROLE_USER"]`,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
