import z from "zod";

export const UserRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  login: z.string().nonempty({ message: "Login is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "The password must be at least 6 characters long." }),
});

export const CreatedUserSchema = UserRegisterSchema.omit({ password: true }).extend({ id: z.string() });

export const UserSchemaServerResponce = z.object({
  idToken: z.string(),
  email: z.string(),
  refreshToken: z.string(),
  expiresIn: z.string(),
  localId: z.string(),
});

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "The password must be at least 6 characters long." }),
  returnSecureToken: z.boolean().optional(),
});

export type UserServerResponce = z.infer<typeof UserSchemaServerResponce>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type User = z.infer<typeof CreatedUserSchema>;

export type UserLogin = z.infer<typeof UserLoginSchema>;
