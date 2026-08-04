import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseProductId: {
      type: Number,
      required: true,
    },

    completedLessons: {
      type: [String],
      default: [],
    },

    lastAccessedLesson: {
      type: String,
      default: "",
    },

    percentage: {
      type: Number,
      default: 0,
    },

    completedAt: Date,
  },
  {
    timestamps: true,
  },
);

courseProgressSchema.index(
  {
    user: 1,
    courseProductId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("CourseProgress", courseProgressSchema);
