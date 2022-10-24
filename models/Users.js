const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNo: Number,
  password: String,
});

module.exports = mongoose.model("users", usersSchema);
