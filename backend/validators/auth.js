const authSchema = require("./schemas/auth");

module.exports.login = (req, res, next) => {
  const value = authSchema.login.validate(req.body);
  if (value.error) {
    res.status(400).json({ message: value.error.details[0].message });
  } else {
    next();
  }
};

module.exports.register = (req, res, next) => {
  const value = authSchema.register.validate(req.body);
  if (value.error) {
    res.status(400).json({ message: value.error.details[0].message });
  } else {
    next();
  }
};

module.exports.forgorPassword = (req, res, next) => {
  const value = authSchema.forgotPassword.validate(req.body);
  if (value.error) {
    res.status(400).json({ message: value.error.details[0].message });
  } else {
    next();
  }
};

module.exports.resetPAssword = (req, res, next) => {
  const value = authSchema.resetPassword.validate(req.body);
  if (value.error) {
    res.status(400).json({ message: value.error.details[0].message });
  } else {
    next();
  }
};
