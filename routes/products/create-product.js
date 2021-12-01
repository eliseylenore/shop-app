const Product = require("../../models/product");

module.exports = (req, res) => {
  let product = new Product({
    title: req.body.title,
    img: req.body.img,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    items: req.body.items
  });

  for (let item of product.items) {
    console.log("item: ", item);
  }
  // save the product and check for errors
  product.save(err => {
    if (err) {
      console.log("err", err);
      res.send(err);
    } else {
      res.json({ message: "product created!", product });
    }
  });
};
