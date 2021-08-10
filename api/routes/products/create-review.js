const Product = require("../../models/product");
const { Review } = require("../../models/review");
const moment = require("moment");

module.exports = async (req, res) => {
  console.log("req.body", req.body);
  // to-do: if there's an email, make sure the user is logged in.
  let product;
  try {
    product = await Product.findById(req.params.product_id);
  } catch (err) {
    res.status(400).json({ err });
  }

  let { nickname, useremail, reviewText, rating } = req.body;
  let review = new Review({
    username: nickname,
    useremail,
    text: reviewText,
    rating,
    date: moment().format("l")
  });
  if (product === undefined) {
    res.status(400).json({ product });
  }
  if (product.reviews !== undefined) {
    product.reviews.push(review);
  } else {
    product.reviews = [review];
  }

  try {
    await product.save();
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
  res.json({ message: "review created!", review });
};
