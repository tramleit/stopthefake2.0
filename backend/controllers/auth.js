const argon = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const ForgotPassword = require("../models/forgotPassword");
const { generateToken } = require("../utils/helpers");
const { email } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

module.exports.login = async (req, res, next) => {
  await User.findOne({ email: req.body.email })
    .then(
      async (resp) => {
        if (resp) {
          const verify = await argon.verify(resp.password, req.body.password);
          if (verify) {
            const token = jwt.sign({ id: resp._id }, JWT_SECRET, {
              algorithm: "HS512",
            });
            res.status(200).json({
              id: resp._id,
              token,
              image: resp.image,
              name: resp.name,
              surname: resp.surname,
              email: resp.email,
              credits: resp.credit,
              role: resp.roles,
            });
          } else {
            res.status(401).json({ message: "Password is incorrect." });
          }
        } else {
          res.status(401).json({ message: "User not registered." });
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

module.exports.register = async (req, res, next) => {
  await User.findOne({ email: req.body.email })
    .then(async (resp) => {
      if (resp) {
        res.status(401).json({ message: "User registered already." });
      } else {
        req.body.password = await argon.hash(req.body.password);
        return await User.create({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password,
        });
      }
    })
    .then((resp) => {
      if (resp) {
        const token = jwt.sign({ id: resp._id }, JWT_SECRET, {
          algorithm: "HS512",
        });
        res.status(200).json({
          id: resp._id,
          token,
          image: resp.image,
          name: resp.name,
          surname: resp.surname,
          email: resp.email,
          credits: resp.credit,
          role: resp.roles,
        });
      }
    })
    .catch((err) => next(err));
};

module.exports.googleAuthUser = async (req, res, next) => {
  await User.findOne({ email: req.user.emails[0].value })
    .then(
      (resp) => {
        if (resp) {
          const token = jwt.sign({ id: resp._id }, JWT_SECRET, {
            algorithm: "HS512",
          });
          res.status(200).json({
            id: resp._id,
            token,
            image: resp.image,
            name: resp.name,
            surname: resp.surname,
            email: resp.email,
            credits: resp.credit,
            role: resp.roles,
          });
        } else {
          return User.create({
            image: req.user.photos[0].value,
            name: req.user.name.givenName,
            surname: req.user.name.familyName,
            email: req.user.emails[0].value,
          });
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

module.exports.forgotPassword = async (req, res) => {
  await User.findOne({ email: req.body.email }).then(async (resp) => {
    if (resp) {
      const token = generateToken(25);
      const date = new Date();
      const expiry = date.setHours(date.getHours() + 1);
      const link = `${process.env.CLIENT_URL}/reset-password?id=${resp._id}&token=${token}`;
      await ForgotPassword.create({
        userId: resp._id,
        email: resp.email,
        token,
        expiry,
      });
      email(
        resp.email,
        "Forgot Password",
        "Reset your password from " + link,
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: sans-serif;
      }
      p,
      h3 {
        margin-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <div style="padding: 10px; background-color: #f7f7f7; padding-bottom: 50px">
      <div style="max-width: 600px; margin: 0px auto">
        <div style="width: 150px; margin: 0px auto">
          <img
            src="https://kmmart.s3.ap-south-1.amazonaws.com/stf/logo-black.0cbf3388da0784e63a30.jpg"
            width="100%"
            alt="Not found"
          />
        </div>
        <div
          style="background-color: #efefef; padding: 10px; border-radius: 10px"
        >
          <h3>Hello! ${resp.name} ${resp.surname}</h3>
          <p>A password reset request has been initiated by you.</p>
          <p>
            Click on link below or copy the link and paste it in url bar in any
            browser.
          </p>
          <p>
            <small
              ><a
                href="${link}"
                target="_blank"
                >${link}</a
              ></small
            >
          </p>
          <p>Link is only valid for one hour.</p>
          <p>If you didn't initiated this request simply ignore this email.</p>
          <p>Regards,</p>
          <h4>StopTheFake</h4>
        </div>
      </div>
    </div>
  </body>
</html>
`
      );
      res.status(200).json({
        message: "A password reset link has been sent to your email.",
      });
    } else {
      res
        .status(400)
        .json({ message: "Email is not associated with any account." });
    }
  });
};

module.exports.resetPassword = async (req, res, next) => {
  const userId = req.body.id;
  const token = req.body.token;
  const password = await argon.hash(req.body.password);

  await ForgotPassword.findOne({ userId, token })
    .then(async (resp) => {
      if (resp) {
        const dt = new Date();
        if (dt < resp.expiry && !resp.expired) {
          return await User.findByIdAndUpdate(
            userId,
            { password },
            { new: true }
          );
        } else {
          res.status(400).json({
            message: "Link is expired. Send password reset request again.",
          });
        }
      } else {
        res.status(400).json({ message: "Password reset link is invalid." });
      }
    })
    .then((resp) => {
      if (resp) {
        res.status(200).json({ message: "Password updated successfully." });
      }
    })
    .catch((err) => next(err));

  await ForgotPassword.updateMany({ userId }, { expired: true });
};
