import mongoose from "mongoose";
import { Role } from "../service/message.js";
import bcrypt from "bcryptjs";
import { SECRET_KEY } from "../config/globalKey.js";
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

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next();
      bcrypt.hash(`${user.password + SECRET_KEY}`, salt, (err, hash) => {
        if (err) return next();
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
const User = mongoose.model("user", userSchema);

export default User;
