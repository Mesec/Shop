const Order = require("../models/order");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.postOrder = (req, res, next) => {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  const userId = decodedToken.userId;
  const address = req.body.address;
  const phone = req.body.phone;
  const products = req.body.cartProducts;
  const totalPrice = req.body.totalPrice;
  let fullName;

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(402).json({ errors: errors });

  User.findById(userId)
    .then((user) => {
      fullName = user.fullName;
    })
    .then(() => {
      const order = new Order({
        userId: userId,
        fullName: fullName,
        address: address,
        phone: phone,
        products: products,
        totalPrice: totalPrice,
      });
      order
        .save()
        .then(() => {
          res.status(200).json("Order is saved to db");
        })
        .catch((error) => {
          res.status(402).json(error);
        });
    });
};

exports.getUserOrders = (req, res, next) => {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  const userId = decodedToken.userId;
  Order.find({ userId })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((error) => {
      res.status(402).json(error);
    });
};
