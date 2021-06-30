const User = require("../../models/user");

module.exports = (req, res) => {
  // get user
  User.findOne({ email: req.params.email }, function(err, user) {
    if (!user) {
      return res.status(400).json({ email: "No email found" });
    }
    if (err) res.status(400).json(err);
    // to-do: check if this product/item exists? has all the right qualities?

    if (!user.cart) {
      res.status(400).json({ cart: "No cart found" });
    }

    let {
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode
    } = req.body;
    let newAddress = {
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode
    }
    if (req.params.type === "billing") {
      user.cart.billingAddress = newAddress;
    } else if (req.params.type === "shipping") {
      user.cart.shippingAddress = newAddress;
    }
    user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
};
