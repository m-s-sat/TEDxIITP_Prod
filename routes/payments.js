const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentControllers");

// Create a new payment order
router.post("/create-order", createOrder);

// Verify payment after successful payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
