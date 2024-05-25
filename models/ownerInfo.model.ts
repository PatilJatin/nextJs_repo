import mongoose, { Schema } from "mongoose";

const ownerInfoSchema = new Schema({
  // todo:model
  name: {
    type: String,
    default: "Sanjay Gupta",
  },
  role: {
    type: String,
    default: "Broker",
  },
  designation: {
    type: String,
    default: "BE",
  },
  speciality: {
    type: [String],
    default: ["Residential Buying", "Selling", "Leasing"],
  },
  areaCovered: {
    type: [String],
    default: ["Milton", "Burlington", "Mississauga", "Brampton", "GTA"],
  },
  description: {
    type: String,
    default:
      "Real Estate is all about buying and selling property. Wrong! To Sanjay Gupta, real estate is about serving real people with real needs and providing real value. Real Estate is much more than jumping into the car to show buyers homes for sale or putting a sale sign on the lawn of a seller - Real Estate with us means as a buyer or seller, you experience the excellence of my proven track record. From walking you through the buying, selling, or investing process in a step-by-step fashion to keeping you updated on market information every step of the way, we believe in doing more than just buying or selling a home - I believe in creating memories and letting our clients experience the excellence...",
  },
  image: {
    type: String,
    default:
      "https://realtor-app-media.s3.ap-south-1.amazonaws.com/044a2ed9-1d09-41da-9e8b-c037eb5d7614.svg",
  },
});

// ========================making the model here
const OwnerInfo =
  mongoose.models.OwnerInfo || mongoose.model("OwnerInfo", ownerInfoSchema);

// =========================Exporting the model
export { OwnerInfo };
