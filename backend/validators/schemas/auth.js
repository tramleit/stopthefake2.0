const joi = require("joi");

module.exports.login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});

module.exports.register = joi.object({
  name: joi.string().min(2).required(),
  surname: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
});

module.exports.forgotPassword = joi.object({
  email: joi.string().email().required(),
});

module.exports.resetPassword = joi.object({
  id: joi.string().required(),
  token: joi.string().required(),
  password: joi.string().min(6).max(16).required(),
});
