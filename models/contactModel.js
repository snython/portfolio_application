// Model for Author
const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contacts",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
  })
);

module.exports = Contact;
