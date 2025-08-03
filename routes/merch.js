const express = require("express");
const router = express.Router();
const {
  getAllMerch,
  getMerchBySize,
  createMerch,
} = require("../controllers/merch");
router.get("/", getAllMerch);

router.get("/size/:size", getMerchBySize);

router.post("/", createMerch);
module.exports = router;
