import { z } from "zod";

const updatePodcastZodSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    category: z.string().min(1).max(255).optional(),
    about: z.string().min(1).optional(),
    bannerUrl: z.string().url().optional(),
    audioTitle: z.string().min(1).max(255).optional(),
    audioUrl: z.string().url().optional(),
    spotifyPodcastLink: z.string().nullable(),
    appleMusicPodcastLink: z.string().nullable(),
    googleMusicPodcastLink: z.string().nullable(),
    stitcherPodcastLink: z.string().nullable(),
  })
  .strict();

export { updatePodcastZodSchema };
