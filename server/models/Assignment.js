import mongoose from "mongoose";

const assignmentFileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },
  },
);

const assignmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    courseProductId: {
      type: Number,
      required: true,
    },

    lessonId: {
      type: String,
      required: true,
    },

    // lessonTitle: {
    //   type: String,
    //   required: true,
    // },

    assignmentTitle: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    files: {
      type: [assignmentFileSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["submitted", "under-review", "approved", "needs-revision"],
      default: "submitted",
    },

    feedback: {
      type: String,
      default: "",
    },

    reviewedAt: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Assignment", assignmentSchema);
