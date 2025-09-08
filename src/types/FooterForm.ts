import z from "zod";

export const FooterFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type FooterForm = z.infer<typeof FooterFormSchema>;
