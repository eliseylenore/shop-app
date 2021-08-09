const mongoose = require("mongoose");
const Product = require("../../models/product");

module.exports = async (req, res) => {
  if (req.body.email !== req.body.review.useremail) {
    res.status(400).json({
      "Email does not match":
        req.body.email +
        " user email must match review user" +
        req.body.review.useremail
    });
  }

  let product;
  try {
    product = await Product.findById(req.params.product_id);
  } catch (err) {
    res.status(400).json({ err });
  }
  if (product === null || product === undefined) {
    res.status(400).json({ "No product found": req.params.product_id });
  }

  let review = product.reviews.find(review => {
    return review._id.toString() === req.body.review._id;
  });
  review.text = req.body.review.text;
  review.rating = req.body.review.rating;

  product
    .save()
    .then(savedProduct => {
      res.json(savedProduct.reviews);
    })
    .catch(err => {
      if (String(err).startsWith("ValidationError")) {
        return res.status(400).json({ rating: "Rating must be 1-5" });
      }
    });
};
