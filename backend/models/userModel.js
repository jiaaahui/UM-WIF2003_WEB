import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    role: {
      type: String, // Assuming the role is a string value
      enum: ["recruiter", "freelancer"], // Enumerate the possible roles
      default: "recruiter", // Set a default role if none is provided
    },
  },
  [
    {
      timestamps: true,
    },
  ]
);

export const User = mongoose.model("User", userSchema);
