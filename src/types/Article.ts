import { z } from "zod";

export const articlesSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type Article = z.infer<typeof articlesSchema>;
