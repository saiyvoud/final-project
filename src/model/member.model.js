import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
  {
    memberID: {
      type: String,
      require: true,
    },
    memberName: {
      type: String,
      require: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    memberRoom: {
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

const Member = mongoose.model("member", memberSchema);
export default Member;
