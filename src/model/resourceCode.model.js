import mongoose from "mongoose";

const resourceCodeSchema = mongoose.Schema(
  {
    thesisId: {
      type: mongoose.Types.ObjectId,
      ref: "thesis",
    },
    fileCode: {
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

const ResourceCode = mongoose.model("resourceCode", resourceCodeSchema);

export default ResourceCode;
