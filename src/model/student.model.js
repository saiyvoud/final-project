import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    studentID: {
      type: String,
      require: true,
    },
    studentName: {
      type: String,
      require: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
    },
    studentRoom: {
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

const Student = mongoose.model("student", studentSchema);
export default Student;
