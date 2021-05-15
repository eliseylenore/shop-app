const User = require("../../models/user");
const { FilledOrder, PendingOrder } = require("../../models/item");

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
      var ObjectID = require("mongodb").ObjectID;
      const _id = new ObjectID(foundItem._id);
      PendingOrder.deleteOne({
        _id
      }).catch(err => console.log(err));

      let newItem = new FilledOrder({
        _id: foundItem._id,
        productId: foundItem.productId,
        itemId: foundItem.itemId,
        orderDate: foundItem.orderDate,
        hex: foundItem.hex,
        color: foundItem.color,
        size: foundItem.size,
        img: foundItem.img,
        quantity: foundItem.quantity,
        title: foundItem.title,
        price: foundItem.price,
        description: foundItem.description,
        category: foundItem.category
      });
      newItem.save().catch(err => console.log(err));
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
