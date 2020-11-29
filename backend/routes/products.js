const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("../middleware/checkUserAuth");
const productController = require("../controllers/products");

router.post("/get-product", productController.getProduct);
router.post("/get-products", productController.getProducts);
router.post(
  "/add-product",
  body("name")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters long."),
  body("type")
    .isString()
    .isLength({ min: 4 })
    .withMessage("Type should be at least 4 characters long."),
  body("image")
    .isString()
    .isLength({ min: 4 })
    .withMessage("Image should be at least 4 characters long."),
  body("amount").isDecimal().withMessage("Amount is not allowed to be empty"),
  body("price").isDecimal().withMessage("Price is not allowed to be empty"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Type should be at least 10 characters long."),

  productController.postProduct
);

router.post(
  "/update-product",
  body("name")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Name should be at least 5 characters long."),
  body("type")
    .isString()
    .isLength({ min: 4 })
    .withMessage("Type should be at least 4 characters long."),
  body("image")
    .isString()
    .isLength({ min: 4 })
    .withMessage("Image should be at least 4 characters long."),
  body("amount").isDecimal().withMessage("Amount is not allowed to be empty"),
  body("price").isDecimal().withMessage("Price is not allowed to be empty"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description should be at least 10 characters long."),
  productController.updateProduct
);

router.post("/delete-product", productController.deleteProduct);

module.exports = router;
