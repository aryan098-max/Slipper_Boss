const router = require("express").Router();
const CartModal = require("../models/Cart");
const OrderModal = require("../models/Orders");

router.post("/add-items-order-table", async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await CartModal.findOne({
      userid: userId,
    });

    const products = cart.products;
    const orderedProducts = await OrderModal.create({
      userid: userId,
      orders: [...products],
    });
    res
      .status(200)
      .json({ msg: "Order placed successfully!", orders: orderedProducts });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
