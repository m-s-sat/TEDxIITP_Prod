const { Merch } = require("../models/merch");

async function getAllMerch(req, res) {
  try {
    const merchItemArray = await Merch.find();
    res.status(200).json(merchItemArray);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getMerchBySize(req, res) {
  const { size } = req.params;
  try {
    const merchItemArray = await Merch.find({ size });
    res.status(200).json(merchItemArray);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function createMerch(req, res) {
  const {
    name,
    offerPrice,
    originalPrice,
    image,
    type,
    size,
    description,
    paymentLink,
  } = req.body;
  try {
    const merchItem = await Merch.create({
      name,
      offerPrice,
      originalPrice,
      image,
      type,
      size,
      description,
      paymentLink,
    });
    res
      .status(201)
      .json({ message: "Merch item created successfully", merchItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
module.exports = { getAllMerch, getMerchBySize, createMerch };
