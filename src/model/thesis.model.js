import mongoose from "mongoose";
import { Status } from "../service/message.js";

const thesisSchema = mongoose.Schema(
  {
    scoringId: {
      type: Array,
      ref: "scoring_id",
      default: "",
    },
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: "student",
      //unique: true,
     },
     member_id:{
      type: String,
      ref: "member_id",
      default: "",
     },
    // studentName: {
    //   type: String,
    //   require: true,
    // },
    // studentRoom: {
    //   type: String,
    //   require: true,
    // },
    // memberID: {
    //   type: String,
    //   default: ""
    // },
    // memberName: {
    //   type: String,
    //   default: ""
    // },
    // memberRoom: {
    //   type: String,
    //   default: ""
    // },
    thesisTitle: {
      type: String,
      require: true,
    },
    thesisFile: {
      type: String,
      default: "",
    },
    proposalFile: {
      type: String,
      require: true,
    },
    thesisStatus: {
      type: String,
      enum: Object.values(Status),
      default: Status.cancel,
    },
    thesisDescription: {
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

const Thesis = mongoose.model("thesis", thesisSchema);

export default Thesis;
