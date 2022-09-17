const User = require("../models/user");

module.exports.getUsers = async (req, res, next) => {
  const page = req.query.page || 1;

  const count = await User.find({ roles: '["ROLE_USER"]' }).countDocuments();

  await User.find({ roles: '["ROLE_USER"]' })
    .skip((page - 1) * 12)
    .limit(12)
    .then((resp) => {
      res.status(200).json({ count, data: resp });
    })
    .catch((err) => next(err));
};

module.exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  await User.findById(id)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => next(err));
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  await User.findByIdAndUpdate(
    id,
    {
      image: req.body.image,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => next(err));
};

module.exports.updateAdminUser = async (req, res, next) => {
  const id = req.params.id;

  await User.findByIdAndUpdate(
    id,
    {
      image: req.body.image,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      credit: +req.body.credit,
    },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => next(err));
};
