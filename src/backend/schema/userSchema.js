import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name already taken"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email already taken"],
    },
    contact: {
      type: Number,
      required: true,
      unique: [true, "Phone already taken"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
