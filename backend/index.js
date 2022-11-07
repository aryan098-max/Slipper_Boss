const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const MasterProductModal = require("./models/MasterProdcuts");
const CartModal = require("./models/Cart");
const app = express();

dotenv.config();
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then((msg) => {
    if (typeof msg === "object") console.log("database server connected...");
  })
  .catch((err) => console.log(err));

app.use(express.json());

/* Routes Started */
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.post("/add-to-master-products", async (req, res) => {
  const { productName, productUrl, productPrice } = req.body;

  try {
    const new_product = await MasterProductModal.create({
      productName,
      productUrl,
      productPrice,
    });

    res.status(200).json({ msg: "created successfully!", new_product });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

app.get("/fetch-all-products", async (req, res) => {
  try {
    const all_products = await MasterProductModal.find();
    res.status(200).json({ msg: "NA", all_products });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

app.get("/fetch-user-cart", async (req, res) => {
  const { _id } = req.query;
  try {
    const cart = await CartModal.findOne({
      userid: _id,
    });

    if (!cart) return res.status(200).json({ products: [] });

    res.status(200).json({ msg: "NA", products: cart.products });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("express server started...");
});
