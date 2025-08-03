const ContactUs = require("../models/contactUs");

const createContactUs = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contactUs = await ContactUs.create({ name, email, message });
    res
      .status(201)
      .json({ message: "Contact Us created successfully", contactUs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createContactUs };
