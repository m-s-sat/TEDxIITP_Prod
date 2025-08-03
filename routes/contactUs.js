const express = require("express");
const router = express.Router();
const { createContactUs } = require("../controllers/contactUs");

router.post("/", createContactUs);

module.exports = router;
