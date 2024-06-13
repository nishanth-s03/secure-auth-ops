import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "User phone number required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User Password Or Username Required"],
    },
    confirmPassword: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
