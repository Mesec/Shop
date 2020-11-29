const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const MONGODB_URI =
  "mongodb+srv://stefan:stefan123@cluster0.nrv6q.mongodb.net/<dbname>?retryWrites=true&w=majority";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("Connected to Database!");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
