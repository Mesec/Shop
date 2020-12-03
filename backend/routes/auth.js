const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authControlers = require("../controllers/auth");

//  Registration
router.post(
  "/register",
  body("fullName")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Full name should be at least 6 characters long."),
  body("email").notEmpty().withMessage("Email is required."),
  body("email").isEmail().withMessage("Email should be regular email"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long."),
  body("password2")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long."),
  authControlers.createUser
);

//Login
router.post(
  "/login",
  body("email").isEmail().notEmpty().withMessage("Email is required."),
  body("password").notEmpty().withMessage("Password is required."),
  authControlers.loginUser
);

module.exports = router;
