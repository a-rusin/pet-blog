import { z } from "zod";

export const viewsScheme = z.array(z.string());
export const likesScheme = z.array(z.string());

export const articlesSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  views: viewsScheme,
  likes: likesScheme,
});

// @ts-ignore
export const articlesArraySchema = z.union([z.array(articlesSchema), z.null()]);

export type Article = z.infer<typeof articlesSchema>;
export type Views = z.infer<typeof viewsScheme>;
export type Likes = z.infer<typeof likesScheme>;
