const PartnerWithUs = require("../models/partnerWithUs");

async function getPartnerWithUs(req, res) {
  try {
    const partnerWithUs_data = await PartnerWithUs.find();
    res.status(200).json(partnerWithUs_data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get partner with us requests" });
  }
}

async function createPartnerWithUs(req, res) {
  try {
    await PartnerWithUs.create(req.body);
    res.status(201).json({ message: "Partner with us request submitted" });
  } catch (error) {
    console.error("Error creating partner request:", error);
    res
      .status(500)
      .json({ message: "Failed to submit partner with us request" });
  }
}

module.exports = { getPartnerWithUs, createPartnerWithUs };
