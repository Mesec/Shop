const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.postOrder = (req, res, next) => {
  const token = req.body.Authorization.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    "superpersusecretnajtajnijistringikadaever"
  );
  let fullName;
  const productsData = req.body.cartProducts;
  const userId = decodedToken.userId;
  const address = req.body.address;
  const phone = req.body.phone;
  const totalPrice = req.body.totalPrice;

  console.log(productsData);
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
        products: productsData,
        totalPrice: totalPrice,
      });
      order.save();
    })
    .then(() => {
      req.body.quantity.forEach((qty) => {
        Product.findById(qty.prodId)
          .then((product) => {
            product.amount = product.amount - qty.qty;
            product.save().then((result) => {
              res.status(200).json("Order is saved to db");
            });
          })
          .catch((err) => {
            console.log(err);
          });
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
