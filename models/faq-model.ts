import mongoose from "mongoose";

// Schema for FAQs
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);
export { FAQ };
