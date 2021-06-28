const User = require("../../models/user");
const moment = require("moment");

module.exports = (req, res) => {
  // get user
  User.findOne({ email: req.params.email }, function (err, user) {
    if (!user) {
      return res.status(400).json({ email: "No email found" });
    }
    if (err) res.status(400).json(err);
    // to-do: check if this product/item exists? has all the right qualities?
    let newItem = { orderDate: moment().format("l"), ...req.body };
    user.cart.items.push(newItem);
    user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
}