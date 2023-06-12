import mongoose from "mongoose";

const thesisMembersSchema = mongoose.Schema(
  {
    memberId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    committeeId: {
      type: mongoose.Types.ObjectId,
      ref: "committee",
      require: true,
    },
    thesisId: {
      type: mongoose.Types.ObjectId,
      ref: "thesis",
      require: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ThesisMembers = mongoose.model("thesisMembers", thesisMembersSchema);

export default ThesisMembers;
