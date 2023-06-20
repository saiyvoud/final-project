import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestapms: true }
);
const Major = mongoose.model("major", majorSchema);
export default Major;
