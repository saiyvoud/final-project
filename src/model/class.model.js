import mongoose from "mongoose";

const classSchema = mongoose.Schema(
  {
    room: {
      type: String,
      require: true,
    },
    majorId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    department: {
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

const Class = mongoose.model("class", classSchema);

export default Class;
