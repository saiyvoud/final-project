import mongoose from "mongoose";

const scoringSchema = mongoose.Schema(
  {
    // thesisMemberId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "thesisMembers",
    // },
    title: {
      type: String,
      require: true,
    },
    point: {
      type: Number,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Scoring = mongoose.model("scoring", scoringSchema);

export default Scoring;
