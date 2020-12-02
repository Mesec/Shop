const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkUserAuth");
const cartControllers = require("../controllers/cart");

router.post(
  "/add-to-cart",
  checkAuth.isUserAuthenticated,
  cartControllers.addToCart
);

router.post(
  "/get-cart-products",
  checkAuth.isUserAuthenticated,
  cartControllers.getCartProducts
);

router.post("/clear-cart", cartControllers.clearCart);

module.exports = router;
