const User = require("../../models/user");
const validateAddressInput = require("../../validation/address");

module.exports = (req, res) => {
  // Form validation
  const { errors, isValid } = validateAddressInput({
    ...req.body
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
    };

    user.addressBook.push(newAddress);

    user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
};
