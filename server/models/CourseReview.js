import mongoose from "mongoose";

const courseReviewSchema = new mongoose.Schema(
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

    courseTitle: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

courseReviewSchema.index(
  {
    user: 1,
    courseProductId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("CourseReview", courseReviewSchema);
