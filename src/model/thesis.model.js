import mongoose from "mongoose";
import { Status } from "../service/message.js";

const thesisSchema = mongoose.Schema(
  {
    scoringId: {
      type: Array,
      default: "",
    },
    studentID: {
      type: String,
      require: true,
    },
    studentName: {
      type: String,
      require: true,
    },
    studentRoom: {
      type: String,
      require: true,
    },
    memberID: {
      type: String,
      default: ""
    },
    memberName: {
      type: String,
      default: ""
    },
    memberRoom: {
      type: String,
      default: ""
    },

    thesisTitle: {
      type: String,
      require: true,
    },
    thesisAbstract: {
      type: String,
      default: "",
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
    thesisDetail: {
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
