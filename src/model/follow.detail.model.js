import mongoose from "mongoose";
const followDetailSchema = mongoose.Schema(
  {
    follow_id: {
      type: mongoose.Types.ObjectId,
      ref: "follow",
      require: true,
    },
    appointment: {
      type: String,
      require: true,
    },
    presentNow: {
      type: String,
      require: true,
    },
    presendEdit: {
      type: String,
      require: true,
    },
    nextAppointment: {
      type: String,
      default: ""
    },
    presentNext: {
      type: String,
      default: ""
    },
    signature: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestapms: true }
);
const FollowDetail = mongoose.model("follow_detail", followDetailSchema);
export default FollowDetail;
