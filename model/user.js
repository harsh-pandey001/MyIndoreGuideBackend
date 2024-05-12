const mongoose = require("mongoose");
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  num: Number,
  password: String,
  nationality: String,
  gender: String,
});

const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User;
