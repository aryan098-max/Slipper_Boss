const mongoose = require("mongoose");
const ProductSchema = require("./Product");

const OrderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  orders: {
    type: [ProductSchema],
    default: [],
  },
});

module.exports = mongoose.model("order", OrderSchema);
