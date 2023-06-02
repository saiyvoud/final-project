import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    scheduleDate: {
      type: String,
    },
    scheduleLocation: {
      type: String,
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
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "class",
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("schedule", scheduleSchema);

export default Schedule;
