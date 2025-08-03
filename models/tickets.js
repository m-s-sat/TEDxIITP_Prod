const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  price_till: {
    type: Date,
    required: true,
  },
  session_type: {
    // 1 for first sesssion   2 for 2nd session :)
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
