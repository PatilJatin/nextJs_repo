import mongoose from "mongoose";

// Custom validator function for URL format
const validateUrl = (value: any) => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlRegex.test(value)) {
    throw new Error("Invalid URL format");
  }
};

// Schema for dynamic data
const dynamicDataSchema = new mongoose.Schema({
  // todo: model
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  hashtags: [
    {
      type: String,
      required: true,
    },
  ],
  // todo: model,  unquie email ids
  users: [String],

  // todo:model 
  ownerName: {
    type: String,
    default: "Sanjay Gupta",
  },
  ownerRole: {
    type: String,
    default: "Broker",
  },
  ownerDesignation: {
    type: String,
    default: "BE",
  },
  ownerSpeciality: {
    type: [String],
    default: ["Residential Buying", "Selling", "Leasing"],
  },
  ownerArea: {
    type: [String],
    default: ["Milton", "Burlington", "Missiasauga", "Brampton", "GTA"],
  },
  ownerDescription: {
    type: String,
    default:
      "Real Estate is all about buying and selling property. Wrong! To Sanjay Gupta, real estate is about serving real people with real needs and providing real value. Real Estate is much more than jumping into the car to show buyers homes for sale or putting a sale sign on the lawn of a seller - Real Estate with us means as a buyer or seller, you experience the excellence of my proven track record. From walking you through the buying, selling, or investing process in a step-by-step fashion to keeping you updated on market information every step of the way, we believe in doing more than just buying or selling a home - I believe in creating memories and letting our clients experience the excellence...",
  },
  ownerImage: {
    type: String,
    default:
      "https://realtor-app-media.s3.ap-south-1.amazonaws.com/044a2ed9-1d09-41da-9e8b-c037eb5d7614.svg",
  },
  // ==================New fields based on requirement from frontend
  // todo:model-home-hero
  heroSliderImages: [
    {
      type: String,
      // validate: [validateUrl, "Invalid URL format for heroSliderImages"],
    },
  ],
  navigationImages: [
    {
      type: String,
      // validate: [validateUrl, "Invalid URL format for navigationImages"],
    },
  ],
});

const DynamicData =
  mongoose.models.DynamicData ||
  mongoose.model("DynamicData", dynamicDataSchema);
export { DynamicData };
