import z from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  content: z.string().nonempty(),
  createdAt: z.string(),
});

export const CommentFormSchema = CommentSchema.omit({ id: true, authorId: true, createdAt: true });

export type CommentForm = z.infer<typeof CommentFormSchema>;
