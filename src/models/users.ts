import { z } from 'zod';

const userSchema = z.object({
  id: z.number().nullable(),
  publicId: z.string().nullable(),
  name: z.string(),
  age: z.number().min(18, { message: 'Minimum age is 18' }),
  superUser: z.boolean().default(false),
  roleId: z.number(),
  email: z.string().email({ message: 'Must be a valid email' }),
  password: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

const createUserSchema = z.object({
  name: z.string(),
  age: z.number().min(18, { message: 'Minimum age is 18' }),
  roleId: z.number(),
});

export type UserModel = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
