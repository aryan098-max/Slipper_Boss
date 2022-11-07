const mongoose = require("mongoose");

const MasterProducts = new mongoose.Schema({
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
});

module.exports = mongoose.model("master", MasterProducts);
