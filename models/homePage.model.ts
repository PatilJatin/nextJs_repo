import { max } from "lodash";
import mongoose, { Schema } from "mongoose";
import { describe } from "node:test";
import { title } from "process";

const homePageSchema = new Schema({
  heroSliderImages: [
    {
      type: String,
    },
  ],
  navigationImages: [
    {
      type: String,
    },
  ],
  socialLinks: [
    {
      name: String,
      link: String,
    },
  ],
  homeAdvertise: [
    {
      title: String,
      description: String,
      navigateTo: String,
      buttonText: String,
      imageSrc: String,
      isImageOnRightSide: Boolean,
    },
  ],
  featuredInSection: [
    {
      imageSrc: String,
      sourceLink: String,
    },
  ],
  footerDescription: {
    type: String,
  },
});

// ========================making the model here
const HomePage =
  mongoose.models.HomePage || mongoose.model("HomePage", homePageSchema);

// =========================Exporting the model
export { HomePage };
