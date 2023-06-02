import mongoose from "mongoose";
import { Role } from "../service/message.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.student,
    },
    profile: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
