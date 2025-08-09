const mongoose = require("mongoose");

const partnerWithUsSchema = new mongoose.Schema(
  {
    nameOfOrganization_or_Individual: {
      type: String,
      required: true,
    },
    websiteOrPortfolioOrSocialMediaLink: {
      type: String,
      required: true,
    },
    industryOrAreaOfWork: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    industryOrAreaOfWork_natureOfPathnerShip: {
      type: String,
      required: true,
    },
    briefDescriptionOfPathnerShip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PartnerWithUs = mongoose.model("PartnerWithUs", partnerWithUsSchema);

module.exports = PartnerWithUs;
