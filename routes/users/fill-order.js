const User = require("../../models/user");
const { FilledOrder, PendingOrder } = require("../../models/order");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).exec();
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
      try {
        await PendingOrder.deleteOne({ _id });
      } catch (err) {
        res.status(400).json(err);
      }

      let newOrder = new FilledOrder({
        items: foundOrder.items,
        shippingAddress: foundOrder.shippingAddress,
        billingAddress: foundOrder.billingAddress,
        email: foundOrder.email,
        orderDate: foundOrder.orderDate
      });
      try {
        newOrder.save();
      } catch (err) {
        res.status(400).json(err);
      }
      const newPendingOrders = user.pendingOrders.filter(newOrder => {
        if (newOrder !== undefined && newOrder._id !== undefined) {
          return newOrder._id.toString() !== _id.toString();
        }
      });
      user.pendingOrders = newPendingOrders;
      try {
        await user.save();
        res.json({ success: true, user });
      } catch (err) {
        res.status(400).json(err);
      }
    } else {
      return res.status(400).json({ itemNotFound: "No item found to fulfill" });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
