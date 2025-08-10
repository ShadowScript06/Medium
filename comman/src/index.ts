import z from "zod";

export const blogPostSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export const signUpSchema=z.object({
    email:z.email(),
    password:z.string().min(6),
});

export type signUpSchema =z.infer<typeof signUpSchema>

export type blogPostSchema = z.infer<typeof blogPostSchema>;
