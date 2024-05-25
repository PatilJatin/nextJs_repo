import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const PrivacyPolicy =
  mongoose.models.PrivacyPolicy ||
  mongoose.model("PrivacyPolicy", privacyPolicySchema);

export { PrivacyPolicy };
