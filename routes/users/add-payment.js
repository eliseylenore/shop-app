// const User = require("../../models/user");
module.exports.addPayment = (cart, username) => {
  return new Promise((resolve, reject) => {
    const reducer = (previousValue, currentValue) =>
      previousValue.price + currentValue.price * currentValue.quantity;
    let totalPrice;
    let { shippingAddress, email, items } = cart;
    if (items.length > 1) {
      totalPrice = items.reduce(reducer);
    } else {
      totalPrice = items[0].price;
    }
    const stripe = require("stripe")(process.env.STRIPESECRETKEY);
    stripe.paymentIntents
      .create({
        statement_descriptor: "Shop App purchase",
        amount: totalPrice * 100,
        payment_method_types: ["card"],
        currency: "usd",
        receipt_email: email,
        shipping: {
          address: {
            city: shippingAddress.city,
            country: "US",
            line1: shippingAddress.addressline1,
            line2: shippingAddress.addressline2,
            postal_code: shippingAddress.zipcode,
            state: shippingAddress.state
          },
          name: username
        }
      })
      .then(paymentIntent => resolve(paymentIntent))
      .catch(error => {
        reject(error);
      });
  });
};
