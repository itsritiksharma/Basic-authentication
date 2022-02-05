const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

// /auth/signup => POST: "ADD USER IN DATABASE"
router.post("/signup",authController.postSignup);

// /auth/login => POST : "POST THE USER DATA TO GET THE auth FROM DATABASE"
router.post("/login",  authController.postLogin);

// /auth/logout => POST : "LOG THE USER OUT BY SETTING THE TOKEN TO NULL"
router.post("/logout", authController.postLogout);

module.exports = router;
