import mongoose from "mongoose";
const followSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    thesis_id: {
      type: mongoose.Types.ObjectId,
      ref: "thesis",
      require: true,
    },
    committee_id: {
      type: mongoose.Types.ObjectId,
      ref: "committee",
      require: true,
    },
    schoolYear: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Follow = mongoose.model("follow",followSchema);
export default Follow;
