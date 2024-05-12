const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/db");
const router = require("./routes/formRoutes");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(
  // { origin: "https://my-indore-guide-fontend.vercel.app"}
));
connectDB();

app.get("/", (req, res) => {
  res.json("hello");
});



app.get("/form", (req, res) => {
  res.json("from");
});



app.use("/form/signup", router);
app.use("/form/auth", router);
app.use("/form/data", router);
// payment Routes
// app.use("/payment",paymentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
