require("dotenv").config();
const mongoose = require("mongoose");

var userDb = mongoose.createConnection(process.env.USERS_MONGO_URI);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    userEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // /*Change this according to your need*/
    // #FIELD_NAME# : {
    //   type: Array,
    //   required: false,
    //   default: null,
    // },
  },
  { versionKey: "revisions" }
);

module.exports = userDb.model("User", userSchema);