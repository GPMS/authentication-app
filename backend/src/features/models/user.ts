import mongoose from "mongoose";

export type User = {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  bio?: string;
  phone?: string;
  provider: "local" | "github";
  password?: string;
};

function isProviderLocal(this: User) {
  return this.provider === "local";
}

const userSchema = new mongoose.Schema<User>({
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

export const UserModel = mongoose.model<User>("User", userSchema);
