const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

module.exports.verify = async (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  try {
    const verify = jwt.verify(token, JWT_SECRET, {
      algorithm: "HS512",
    });
    if (verify) {
      await User.findById(verify.id)
        .then(
          (resp) => {
            const { password, ...info } = resp._doc;
            req.user = info;
            next();
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("JWT Error: ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
  //   res.status(200).json(token);
};
