import { z } from "zod";

const authorCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, {
      message: "First letter of Every word should be capital",
    }),
  description: z.string().trim().min(2, "minimum length should be 2"),
  image: z.string().trim(),
});

const authorUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/, {
      message: "First letter of Every word should be capital",
    })
    .optional(),
  description: z
    .string()
    .trim()
    .min(2, "minimum length should be 2")
    .optional(),
  image: z.string().trim().optional(),
});

export { authorCreateSchema, authorUpdateSchema };
