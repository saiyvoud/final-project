import mongoose from "mongoose";
import { Status } from "../service/message.js";

const thesisSchema = mongoose.Schema(
  {
    scoringId: {
      type: Array,
      default: ""
    },
    classId: {
      type: String,
      default: ""
    },
    timeId: {
      type: String,
      default: ""
    },
    studentID: {
      type: String,
      require: true,
    },
    studentName: {
      type: String,
      require: true,
    },
    memberID: {
      type: String,
      require: true,
    },
    memberName: {
      type: String,
      require: true,
    },
    thesisTitle: {
      type: String,
      require: true,
    },
    thesisAbstract: {
      type: String,
      require: true,
    },
    thesisFile: {
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
      require: true,
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
