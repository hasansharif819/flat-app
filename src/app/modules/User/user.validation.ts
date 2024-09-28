import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    name: z.string().optional(),
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
    status: z.string().optional(),
    role: z.string().optional(),
  }),
});

export const userValidationSchema = {
  createUserSchema,
  updateUserSchema,
};
