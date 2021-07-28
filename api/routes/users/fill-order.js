const User = require("../../models/user");
const { FilledOrder, PendingOrder } = require("../../models/order");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    const { _id } = req.body;

    const foundOrder = user.pendingOrders.find(item => {
      if (item !== undefined && item._id !== undefined) {
        return item._id.toString() === _id;
      }
    });
    if (foundOrder) {
      user.fulfilledOrders.push(foundOrder);
      var ObjectID = require("mongodb").ObjectID;
      const _id = new ObjectID(foundOrder._id);
      PendingOrder.deleteOne({
        _id
      }).catch(err => console.log(err));

      let newOrder = new FilledOrder({
        items: foundOrder.items,
        shippingAddress: foundOrder.shippingAddress,
        billingAddress: foundOrder.billingAddress,
        email: foundOrder.email,
        orderDate: foundOrder.orderDate
      });
      newOrder.save().catch(err => console.log(err));
      const newPendingOrders = user.pendingOrders.filter(newOrder => {
        if (newOrder !== undefined && newOrder._id !== undefined) {
          return newOrder._id.toString() !== _id.toString();
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
