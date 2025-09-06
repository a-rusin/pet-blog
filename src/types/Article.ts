import { z } from "zod";

export const articlesSchema = z.object({
  id: z.string(),
  title: z.string(),
});

// @ts-ignore
export const articlesArraySchema = z.union([z.array(articlesSchema), z.null()]);

export type Article = z.infer<typeof articlesSchema>;
