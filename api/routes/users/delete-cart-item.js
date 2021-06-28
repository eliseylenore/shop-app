const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    const { _id } = req.body;

    const newCart = user.cart.items.filter(item => {
      if (item !== undefined && item._id !== undefined) {
        return item._id.toString() !== _id;
      }
    });
    user.cart.items = newCart;
    user
      .save()
      .then(user => res.json(user.cart.items))
      .catch(err => console.log(err));
  });
};
