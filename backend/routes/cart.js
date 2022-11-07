const router = require("express").Router();
const CartModal = require("../models/Cart");

router.post("/add-item", async (req, res) => {
  const { name, url, userId, dec, inc, productId, price } = req.body;
  try {
    const item = await CartModal.findOne({
      userid: userId,
    });

    let cartGenerated, _products;
    if (!item) {
      cartGenerated = await CartModal.create({
        userid: userId,
      });
      cartGenerated.products = [
        {
          productName: name,
          productUrl: url,
          productPrice: price,
          productId: productId,
        },
      ];
      cartGenerated.save();
    } else {
      const h = item.products.find((f) => f.productId.toString() === productId);

      console.log({ h, inc, dec });

      if (h && inc) {
        h.count += 1;
      } else if (h && dec) {
        if (h.count === 1) {
          item.products = [...item.products].filter(
            (f) => f.productId !== productId
          );
        } else {
          h.count -= 1;
        }
      } else if (h) {
        h.count += 1;
      } else {
        item.products = [
          ...item.products,
          {
            productName: name,
            productUrl: url,
            productPrice: price,
            productId: productId,
          },
        ];
      }
      item.save();
    }

    res.status(200).json({
      msg: item || cartGenerated,
      message: "New Cart Generated and added item successfully!",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/delete-item", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await CartModal.findOne({
      userid: userId,
    });

    const remained = cart?.products?.filter(
      (c) => c._id.toString() !== productId
    );

    cart.products = remained;
    cart.save();

    res
      .status(200)
      .json({ msg: "item deleted successfully!", products: cart.products });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/clear-cart", async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await CartModal.findOneAndDelete({
      userid: userId,
    });

    console.log(cart);

    res.status(200).json({ msg: "cart deleted successfully!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
