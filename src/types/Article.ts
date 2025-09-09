import { z } from "zod";
import { CreatedUserSchema } from "./Auth";

export const viewsScheme = z.array(z.string());
export const likesScheme = z.array(z.string());

export const articlesSchemaServer = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  author: z.string(),
  createdAt: z.string(),
  views: viewsScheme,
  likes: likesScheme,
  tags: z.array(z.string()),
  fullText: z.string().nonempty(),
});

export const articlesSchemaClient = articlesSchemaServer.omit({ author: true }).extend({
  author: CreatedUserSchema,
});

export const articlesSchemaCreateUpdateForm = articlesSchemaServer
  .omit({ author: true, createdAt: true, id: true, likes: true, views: true, tags: true })
  .extend({
    id: z.string().optional(),
    tags: z.string().nonempty(),
  });

// @ts-ignore
export const articlesArraySchema = z.union([z.array(articlesSchemaServer), z.null()]);

export type ArticleServer = z.infer<typeof articlesSchemaServer>;
export type ArticleClient = z.infer<typeof articlesSchemaClient>;

export type ArticleCreateUpdateForm = z.infer<typeof articlesSchemaCreateUpdateForm>;

export type Views = z.infer<typeof viewsScheme>;
export type Likes = z.infer<typeof likesScheme>;
