const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

module.exports = ProductSchema;
