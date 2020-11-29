const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/cart");

router.post("/add-to-cart", cartControllers.addToCart);

router.post("/get-cart-products", cartControllers.getCartProducts);

router.post("/clear-cart", cartControllers.clearCart);

module.exports = router;
