import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  studentID: {
    type: String,
    require: true,
  },
  studentName: {
    type: String,
    require: true,
  },
  studentEmail: {
    type: String,
    require: true,
    unique: true,
  },
  studentDepartment: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
},{timestamps: true});

const Student = mongoose.model('student',studentSchema);
export default Student;
