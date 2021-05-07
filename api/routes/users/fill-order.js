const User = require("../../models/user");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    const { _id } = req.body;

    const foundItem = user.pendingOrders.find(item => {
      if (item !== undefined && item._id !== undefined) {
        return item._id.toString() === _id;
      }
    });
    if (foundItem) {
      user.fulfilledOrders.push(foundItem);
      const newPendingOrders = user.pendingOrders.filter(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() !== _id;
        }
      });
      user.pendingOrders = newPendingOrders;
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    } else {
      return res.status(400).json({ itemNotFound: "No item found to fulfill" });
    }
  });
};
