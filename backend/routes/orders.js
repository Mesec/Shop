const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const orderControllers = require("../controllers/orders");

router.post(
  "/purchase",
  body("address")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Address should be at least 8 characters long"),
  body("phone")
    .not()
    .isEmpty()
    .isLength({ min: 9 })
    .withMessage("Phone number is not valid."),
  orderControllers.postOrder
);

router.post("/get-user-orders", orderControllers.getUserOrders);

module.exports = router;
