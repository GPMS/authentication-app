import mongoose from "mongoose";

export type TUser = {
  email: string;
  photo: string;
  name: string;
  bio: string;
  phone: string;
  password: string;
};

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
  },
});

export const User = mongoose.model<TUser>("User", userSchema);
