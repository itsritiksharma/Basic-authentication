const express = require("express");

const router = express.Router();

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

// /auth/signup => POST: "ADD USER IN DATABASE"
router.post(
  "/signup",
  [
    body("userEmail", "Enter valid email").isEmail(),
    body("password", "Password should be of 6 characters long.").isLength({
      min: 6,
    }),
  ],
  authController.postSignup
);

// /auth/login => POST : "POST THE USER DATA TO GET THE auth FROM DATABASE"
router.post(
  "/login",
  [
    body("userEmail", "Email is not valid.").isEmail(),
    body("password", "Password should be of 6 characters long.").isLength({
      min: 6,
    }),
  ],
  authController.postLogin
);

// /auth/logout => POST : "LOG THE USER OUT BY SETTING THE TOKEN TO NULL"
router.post("/logout", authController.postLogout);

module.exports = router;
