import mongoose from "mongoose";
import { Status } from "../service/message.js";

const thesisSchema = mongoose.Schema(
  {
    scheduleDate: {
      type: String,
    },
    scoringId: {
      type: Array,
    },
    studentId: {
      type: Array,
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
      default: Status.edit,
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
