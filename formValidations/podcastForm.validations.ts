import { z } from "zod";

export const podcastFormValidations = z.object({
  name: z.string().min(1, "Name is required").max(255),
  category: z.object({
    value: z.string().min(1, "Category is required"),
    label: z.string(),
  }),
  about: z.string().min(1, "About is required").max(5000),
  bannerUrl: z.string().min(1, "Banner Image is required").url(),
  bannerImgInput: z.string(),
  audioTitle: z.string().min(1, "Audio Title is required").max(255),
  audioInput: z.string(),
  audioUrl: z.string().min(1, "Audio is required"),
  spotifyPodcastLink: z.string(),
  appleMusicPodcastLink: z.string(),
  googleMusicPodcastLink: z.string(),
  stitcherPodcastLink: z.string(),
});
