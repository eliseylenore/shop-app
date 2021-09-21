// const User = require("../../models/user");
const { stripeSecretKey } = require("../../keys");

module.exports = async (req, res) => {
  const stripe = require("stripe")(stripeSecretKey);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: "jenny.rosen@example.com"
    });
    res.json(paymentIntent);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
