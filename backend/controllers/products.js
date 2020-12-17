const Product = require("../models/product");
const { validationResult } = require("express-validator");

//    ****GET ALL PRODUCTS FROM DB****
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      let types = [];
      products.forEach((product) => {
        types.push(product.type);
      });
      const filteredTypes = types.filter(
        (item, index) => types.indexOf(item) === index
      );

      if (req.body.type) {
        const filteredProducts = products.filter(
          (product) => product.type === req.body.type
        );
        return res
          .status(200)
          .json({ products: filteredProducts, filteredTypes: filteredTypes });
      }
      res
        .status(200)
        .json({ products: products, filteredTypes: filteredTypes });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ***GET PRODUCTS FILTERED BY PRICE***

exports.filterByPrice = (req, res, next) => {
  const min = req.body.min;
  const max = req.body.max;

  Product.find()
    .then((products) => {
      const filteredProducts = products.filter((product) => {
        if (product.price < max && product.price > min) {
          return product;
        }
      });
      res.status(200).json(filteredProducts);
    })
    .catch((error) => {
      res.json(error);
    });
};

//    ****GET SINGLE PRODUCT FROM DB****
exports.getProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

//    ****ADD PRODUCT TO DB****
exports.postProduct = (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const image = req.body.image;
  const amount = req.body.amount;
  const price = req.body.price;
  const description = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(402).json({ errors: errors, oldData: req.body });
  else {
    const product = new Product({
      name: name,
      type: type,
      image: image,
      amount: amount,
      price: price,
      description: description,
    });
    product
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
};

//    ****UPDATE PRODUCT****

exports.updateProduct = (req, res, next) => {
  const productId = req.body._id;
  const name = req.body.name;
  const type = req.body.type;
  const image = req.body.image;
  const amount = req.body.amount;
  const price = req.body.price;
  const description = req.body.description;

  Product.findById(productId)
    .then((product) => {
      product.name = name;
      product.type = type;
      product.image = image;
      product.amount = amount;
      product.price = price;
      product.description = description;

      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(402).json({ errors: errors, oldData: req.body });
      else {
        return product
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(402).json({ errors: errors });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//    ****DELETE PRODUCT****

exports.deleteProduct = (req, res, next) => {
  Product.findOneAndRemove({ _id: req.body._id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
