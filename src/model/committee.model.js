import mongoose from "mongoose";
const committeeSchema = mongoose.Schema(
  {
    committeeID: {
      type: String,
      require: true,
    },
    committeeName: {
      type: String,
      require: true,
    },
    committeeDescription: {
      type: String,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Committee = mongoose.model("committee", committeeSchema);
export default Committee;
