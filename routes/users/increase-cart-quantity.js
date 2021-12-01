const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    if (!user) {
      return res.status(400).json({ "User error": "No user fuond" });
    } else {
      const { _id, quantity } = req.body;

      // for (let item in user.cart.items) {
      //   console.log("item._id" + item._id.toString());
      //   console.log("_id" + _id);
      // }
      const foundItem = user.cart.items.find(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() === _id;
        }
      });
      foundItem.quantity = foundItem.quantity + parseInt(quantity);
      user
        .save()
        .then(user => res.json(user.cart.items))
        .catch(err => console.log(err));
    }
  });
};
