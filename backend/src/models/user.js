import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export const User = mongoose.model("User", userSchema);
