const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = (props) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  // Event handling for successful connection
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
    // console.log(process.env.MONGODB_URI)
  });

  // Event handling for connection error
  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
};


module.exports = connectDB;