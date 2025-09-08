import { z } from "zod";
import { CreatedUserSchema } from "./Auth";

export const viewsScheme = z.array(z.string());
export const likesScheme = z.array(z.string());

export const articlesSchemaServer = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  createdAt: z.string(),
  views: viewsScheme,
  likes: likesScheme,
  tags: z.array(z.string()),
  fullText: z.string(),
});

export const articlesSchemaClient = articlesSchemaServer.omit({ author: true }).extend({
  author: CreatedUserSchema,
});

// @ts-ignore
export const articlesArraySchema = z.union([z.array(articlesSchemaServer), z.null()]);

export type ArticleServer = z.infer<typeof articlesSchemaServer>;
export type ArticleClient = z.infer<typeof articlesSchemaClient>;
export type Views = z.infer<typeof viewsScheme>;
export type Likes = z.infer<typeof likesScheme>;
