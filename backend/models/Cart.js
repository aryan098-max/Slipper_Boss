const mongoose = require("mongoose");
const ProductSchema = require("./Product");

const CartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  products: {
    type: [ProductSchema],
    default: [],
  },
});

module.exports = mongoose.model("cart", CartSchema);
