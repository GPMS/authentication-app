import mongoose from "mongoose";
import z from "zod";

export const UserSchema = z.object({
  email: z.string().email().min(1, { message: "Email cannot be blank" }),
  photo: z.string().url(),
  name: z.string(),
  bio: z.string(),
  phone: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});

export type TUser = z.infer<typeof UserSchema>;

const userSchema = new mongoose.Schema<TUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: String,
  name: String,
  bio: String,
  phone: String,
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

export const User = mongoose.model<TUser>("User", userSchema);
