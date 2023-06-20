import mongoose from "mongoose";
const timeSchema = mongoose.Schema({
  startTime: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,

    default: true,
  },
},{timestamps: true});
const Time = mongoose.model("time",timeSchema);
export default Time;
