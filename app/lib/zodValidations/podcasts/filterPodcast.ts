import { z } from "zod";

const filterPodcastZodSchema = z
  .object({
    category: z.string().min(1).max(255),
  })
  .strict();

export { filterPodcastZodSchema };
