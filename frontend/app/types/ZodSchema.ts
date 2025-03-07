import { z } from "zod";

export const addFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name cannot be empty" })
    .max(255, { message: "name must be at least 255 characters" }),
  number: z.union([
    z.string(),
    z
      .number()
      .refine((val) => !Number.isNaN(val), { message: "NaN is not allowed" }),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  color: z.string().min(1, { message: "color cannot be empty" }).optional(),
});

export const stuffFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name cannot be empty!" })
    .max(255, { message: "name must be at least 255 characters" }),
  quantity: z.number(),
  merk: z.string().optional(),
  detail: z.string().optional(),
  img_url: z.string().optional(),
});
