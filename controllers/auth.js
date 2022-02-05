const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ObjectId = mongoose.ObjectId;

const { validationResult } = require("express-validator");

const User = require("../models/user");

// CHECK IF THE USER ALREADY EXISTS, HASH THE PASSWORD, AND GENERATE THE TOKEN.
exports.postSignup = async (req, res, next) => {
  let errorsArray = [];
  const email = req.body.userEmail.toLowerCase();

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorsArray.push(error.msg);
      });
    }

    const user = await User.findOne({ userEmail: email });

    if (user) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    if (hashedPassword) {
      const newUser = await new User({
        // userName: userName,
        userEmail: email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      if (!savedUser) {
        throw new Error("User not created, some error occured!");
      }

      let token;

      token = jwt.sign(
        { userId: savedUser._id, userEmail: savedUser.userEmail },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({
        message: "User created successfully",
        user: {
          email: savedUser.userEmail,
          id: savedUser._id,
        },
        token,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "User creation failed!",
      error: err.message,
    });
  }
};

// CHECK IF THE EMAIL AND PASSWORD ARE NOT EMPTY, CHECK IF THE EMAIL EXISTS IN DATABASE AND FINALLY MATCH THE PASSWORD WITH ALREADY STORED HASHED PASSWORD
exports.postLogin = async (req, res, next) => {
  let errorsArray = [];
  const email = req.body.userEmail.toLowerCase();
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorsArray.push(error.msg);
      });
    }

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      throw new Error("No user exists with this email address.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword || errorsArray.length !== 0) {
      throw new Error("Email or password is not valid!");
    }

    let token;

    token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      userId: user._id,
      userEmail: user.userEmail,
      token: token,
    });
  } catch (err) {
    let errorMessages = [];

    errorsArray.forEach((msg) => {
      errorMessages.push(msg);
    }),
      res.status(401).json({
        message: "Authentication Failed",
        error: err.message,
        additionalErrors: errorMessages,
      });
  }
};

// LOG THE USER OUT AND REDIRECT
exports.postLogout = (req, res, next) => {
  res.status(200).json({
    message: "Logged Out!!",
  });
};
