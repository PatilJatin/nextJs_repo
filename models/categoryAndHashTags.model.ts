import mongoose, { Schema } from "mongoose";

const categoryAndHashtagSchema = new Schema({
  propertyCategories: [
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
  podcastCategory: [
    {
      type: String,
      required: true,
    },
  ],
});

// ========================making the model here
const CategoryAndHashtag =
  mongoose.models.CategoryAndHashtag ||
  mongoose.model("CategoryAndHashtag", categoryAndHashtagSchema);

// =========================Exporting the model
export { CategoryAndHashtag };
