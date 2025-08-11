const express = require("express");
const router = express.Router();
const {
  getPartnerWithUs,
  createPartnerWithUs,
} = require("../controllers/partnerWithUs");

router.get("/", getPartnerWithUs);

router.post("/", createPartnerWithUs);

module.exports = router;
