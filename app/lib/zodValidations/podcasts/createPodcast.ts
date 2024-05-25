import { z } from "zod";

const createPodcastZodSchema = z
  .object({
    name: z.string().min(1).max(255),
    category: z.string().min(1).max(255),
    about: z.string().min(1).max(5000),
    bannerUrl: z.string().url(),
    audioTitle: z.string().min(1).max(255),
    audioUrl: z.string().url(),
    spotifyPodcastLink: z.string().nullable(),
    appleMusicPodcastLink: z.string().nullable(),
    googleMusicPodcastLink: z.string().nullable(),
    stitcherPodcastLink: z.string().nullable(),
  })
  .strict();

export { createPodcastZodSchema };
