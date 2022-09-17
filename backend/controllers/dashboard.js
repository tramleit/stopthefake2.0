const Product = require("../models/product");
const User = require("../models/user");

module.exports.dashboardStats = async (req, res) => {
  const allUsers = await User.find().countDocuments();
  const allLegitChecks = await Product.find({
    deleted: { $ne: true },
  }).countDocuments();
  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  //   res.status(200).json(dt);
  const newUsers = await User.find({ createdAt: { $gt: dt } }).countDocuments();
  const newLegitChecks = await Product.find({
    createdAt: { $gt: dt },
  }).countDocuments();

  res.status(200).json({ allUsers, allLegitChecks, newUsers, newLegitChecks });
};
