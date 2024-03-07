import z from 'zod';

export const userSchema = z.object({
  email: z.string().email().or(z.literal('')),
  photo: z.string().url().or(z.literal('')),
  name: z.string(),
  bio: z.string(),
  phone: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 characters' })
    .or(z.literal('')),
});

export type User = z.infer<typeof userSchema>;

export type AuthResponse = {
  accessToken: string;
};

export type UserDTO = {
  email: string;
  password: string;
};
