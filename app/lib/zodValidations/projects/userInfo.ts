import { z } from "zod";
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: any) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const userInfoZodSchema = z
  .object({
    projectId: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.number(),
  })
  .strict();
export { userInfoZodSchema };
