const User = require("../models/user");
const Product = require("../models/product");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//    ****ADD TO CART****
exports.addToCart = (req, res, next) => {
  const user = new User();
  user.addToCart(req, res);
};

exports.getCartProducts = (req, res, next) => {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  const userId = decodedToken.userId;

  User.findById(userId)
    .populate("cart.items.productId")
    .then((user) => {
      // console.log(user.cart.items[0].productId);
      res.json(user.cart.items);
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.clearCart = (req, res, next) => {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  const userId = decodedToken.userId;

  User.findById(userId).then((user) => {
    user.cart.items = [];
    user.save().then(() => {
      res.status(200).json("Cleaned");
    });
  });
};
