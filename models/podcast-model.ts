import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    audioTitle: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    spotifyPodcastLink: {
      type: String,
      // required: true,
    },
    appleMusicPodcastLink: {
      type: String,
      // required: true,
    },
    googleMusicPodcastLink: {
      type: String,
      // required: true,
    },
    stitcherPodcastLink: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Podcast =
  mongoose.models.Podcast || mongoose.model("Podcast", podcastSchema);

export { Podcast };
