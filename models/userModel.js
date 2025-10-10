// Model for Book
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: {
      type: String,
      required: "Password is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  }).pre("save", function (next) {
    this.updated = Date.now();
    next();
  })
);

module.exports = User;
