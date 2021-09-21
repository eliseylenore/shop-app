// const User = require("../../models/user");
const { stripeSecretKey } = require("../../keys");

module.exports.addPayment = async (cartItems, orderEmail) => {
  return new Promise((resolve, reject) => {
    // const reducer = (previousValue, currentValue) =>
    //   previousValue.price + currentValue.price * currentValue.quantity;
    // let totalPrice;
    // if (cartItems.length > 1) {
    //   totalPrice = cartItems.reduce(reducer);
    // } else {
    //   totalPrice = cartItems[0].price;
    // }
    let line_items = [];
    cartItems.forEach(item => {
      line_items.push({
        name: item.title,
        description: item.description,
        currency: "usd",
        amount: item.price * 100,
        quantity: item.quantity
      });
    });
    const stripe = require("stripe")(stripeSecretKey);
    stripe.checkout.sessions
      .create({
        // amount: totalPrice * 100,
        line_items,
        payment_method_types: ["card"],
        customer_email: orderEmail,
        success_url: "http://localhost:8080/dashboard/profile",
        cancel_url: "http://localhost:8080/dashboard/profile"
      })
      .then(paymentIntent => resolve(paymentIntent))
      .catch(error => reject(error));
  });
};
