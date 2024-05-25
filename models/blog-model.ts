import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    bannerUrl: {
      type: String,
      required: true,
      trim: true,
    },
    isRelatedToHowToScreen: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export { Blog };
