import { z } from "zod";

export const addFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name cannot be empty" })
    .max(255, { message: "name must be at least 255 characters" }),
  number: z
    .number()
    .optional(),
  color: z
    .string()
    .min(1, { message: "color cannot be empty" })
    .optional(),
});
