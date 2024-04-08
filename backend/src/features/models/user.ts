import mongoose from "mongoose";

export type TUser = {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  bio?: string;
  phone?: string;
  provider: "local" | "github";
  password?: string;
};

function isProviderLocal(this: TUser) {
  return this.provider === "local";
}

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
  provider: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: isProviderLocal,
    select: false,
    minlength: 8,
  },
});

export const User = mongoose.model<TUser>("User", userSchema);
