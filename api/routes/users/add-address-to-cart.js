const User = require("../../models/user");
const validateAddressInput = require("../../validation/address");

module.exports = (req, res) => {
  if (
    req.params.type.toLowerCase() !== "shipping" &&
    req.params.type.toLowerCase() !== "billing"
  ) {
    return res.status(400).json({
      params:
        "Param address type must be 'billing' or 'shipping', but it was '" +
        req.params.type +
        "'"
    });
  }
  // Form validation
  const { errors, isValid } = validateAddressInput({
    ...req.body,
    type: req.params.type.toLowerCase()
  });
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
      name,
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode
    } = req.body;
    let newAddress = {
      name,
      addressline1,
      addressline2,
      city,
      state,
      country,
      zipcode
    };

    if (req.body.email) {
      user.cart.email = req.body.email;
    }
    if (req.params.type === "billing") {
      user.cart.billingAddress = newAddress;
    } else if (req.params.type === "shipping") {
      user.cart.shippingAddress = newAddress;
    }
    user
      .save()
      .then(user => res.json(user.addressBook))
      .catch(err => console.log(err));
  });
};
