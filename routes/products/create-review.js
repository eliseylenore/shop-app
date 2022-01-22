const Product = require("../../models/product");
const { Review } = require("../../models/review");
const { DateTime } = require("luxon");

const validateReviewInput = require("../../validation/review");

module.exports = async (req, res) => {
  const { errors, isValid } = validateReviewInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
    date: DateTime.utc()
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
