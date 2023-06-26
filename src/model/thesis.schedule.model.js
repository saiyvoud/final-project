import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Types.ObjectId,
      ref: "admin",
      require: true,
    },
    major_id: {
      type: mongoose.Types.ObjectId,
      ref: "major",
      require: true,
    },
    thesis_id: {
      type: Array,
      default: "",
    },
    times: {
      type: Array,
      default: "",
    },
    committeeName: {
      type: Array,
      default: "",
    },
    classRoom: {
      type: String,
      require: true,
    },
    dateTime: {
      type: String,
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

const ThesisSchedule = mongoose.model("thesis_schedule", scheduleSchema);

export default ThesisSchedule;
