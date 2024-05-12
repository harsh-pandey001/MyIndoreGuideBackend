const mongoose = require("mongoose");


const DestinationSchema = new mongoose.Schema({
  name: String,
  email: String,
  num: Number,
  password: String,
  nationality: String,
  gender: String,
});

const Dest = mongoose.model("destination", DestinationSchema);

module.exports = Dest;
