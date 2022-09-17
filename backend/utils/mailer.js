require("dotenv").config();
const SGMailer = require("@sendgrid/mail");

const API_KEY = process.env.SENDGRID_API_KEY;

SGMailer.setApiKey(API_KEY);

module.exports.email = (to, subject, text = "", html = "") => {
  if (html === "") {
    SGMailer.send({
      to,
      from: {
        name: "StopTheFake",
        email: "stopthefake.test@gmail.com",
      },
      subject,
      text,
    });
  } else {
    SGMailer.send({
      to,
      from: {
        name: "StopTheFake",
        email: "stopthefake.test@gmail.com",
      },
      subject,
      text,
      html,
    });
  }
};
