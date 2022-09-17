const Package = require("../models/package");
const Payment = require("../models/payment");
const User = require("../models/user");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

module.exports.stripePay = async (req, res, next) => {
  const pkgId = req.body.pkgId;

  const package = await Package.findOne({ id: pkgId });

  if (!package) return res.status(400).json({ message: "Package is invalid." });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: package.title },
            unit_amount: Number.parseInt(package.price.split(",").join("")),
          },
          //   quantity: item.quantity,
          quantity: 1,
        },
      ],
      success_url: `${CLIENT_URL}/subscription?pkgId=${package._id}`,
      cancel_url: `${CLIENT_URL}/subscription`,
    });
    res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports.credits = async (req, res, next) => {
  const pkgId = req.body.pkgId;
  const id = req.body.sessionId;

  const package = await Package.findById(pkgId);

  if (!package) return res.status(400).json({ message: "Package is invalid." });

  const credits = req.user.credit + package.credits;
  req.user = await User.findByIdAndUpdate(
    req.user._id,
    { credit: credits },
    { new: true }
  );
  await Payment.create({
    userId: req.user._id,
    packageId: package._id,
    stripe_id: id,
  })
    .then(
      (resp) => {
        res.status(200).json({
          credits: req.user.credit,
          message: "Subscribed successfully.",
        });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};
