import mongoose from "mongoose";
const investingInPropertiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageSrc: {
      type: String,
      trim: true,
    },
    isImageRightSide: {
      type: Boolean,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const InvestingInProperties =
  mongoose.models.InvestingInProperties ||
  mongoose.model("InvestingInProperties", investingInPropertiesSchema);

export { InvestingInProperties };
