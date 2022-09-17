const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    token: { type: String, required: true },
    expiry: {
      type: Date,
      requried: true,
    },
    expired: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);
module.exports = ForgotPassword;
