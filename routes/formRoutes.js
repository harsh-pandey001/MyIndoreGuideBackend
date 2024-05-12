const User = require("../model/user");
const Dest = require("../model/destination");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Harshisgoodboy";
var jwt = require("jsonwebtoken");
// import paymentController from "./payment.controller";

//route :1 For signup end point
router.post("/create", async (req, res) => {
  // console.log("connected with backend", req.body);
  console.log("connected with backend");

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    num: req.body.num,
    password: secPass,
    nationality: req.body.nationality,
    gender: req.body.gender,
  });

  let complete = await newuser.save();
  // res.json({ complete });
});


// Route 2 : Login   end point
router.post(
  "/login",
  [
    body("email", "Enter a valid E-mail").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are errors, return bad request and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Can't find the email" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Password is wrong",
          password: user.password,
          right: password,
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occur");
    }
  }
);

//Routes : 3
// router.route("/orders").post(paymentController.orderCreate);s

module.exports = router;
