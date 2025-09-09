import { z } from "zod";
import { CreatedUserSchema } from "./Auth";
import { title } from "process";

// @ts-ignore
export const viewsScheme = z.union([z.array(z.string()), z.undefined()]);
// @ts-ignore
export const likesScheme = z.union([z.array(z.string()), z.undefined()]);

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

export const articlesSchemaClient = articlesSchemaServer.omit({ author: true, likes: true, views: true }).extend({
  author: CreatedUserSchema,
  likes: viewsScheme,
  views: likesScheme,
});

export const articlesSchemaCreateUpdateForm = articlesSchemaServer
  .omit({
    author: true,
    createdAt: true,
    id: true,
    likes: true,
    views: true,
    tags: true,
    title: true,
    description: true,
  })
  .extend({
    id: z.string().optional(),
    tags: z.string().nonempty(),
    title: z.string().nonempty().max(60),
    description: z.string().nonempty().max(220),
  });

// @ts-ignore
export const articlesArraySchema = z.union([z.array(articlesSchemaServer), z.null()]);

export type ArticleServer = z.infer<typeof articlesSchemaServer>;
export type ArticleClient = z.infer<typeof articlesSchemaClient>;

export type ArticleCreateUpdateForm = z.infer<typeof articlesSchemaCreateUpdateForm>;

export type Views = z.infer<typeof viewsScheme>;
export type Likes = z.infer<typeof likesScheme>;
