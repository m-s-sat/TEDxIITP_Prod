const mongoose = require("mongoose");

const merchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  offerPrice: {
    // paying price
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    // such as hoodie   , tshirt , cap  etc
    type: String,
    required: true,
  },
  size: {
    type: String, // s,m,l,xl,xxl
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentLink: {
    type: String,
    required: true,
  },
});

const Merch = mongoose.model("Merch", merchSchema);
module.exports = { Merch };
