import CourseReview from "../models/CourseReview.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const review = await CourseReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    review.approved = req.body.approved;

    await review.save();

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await CourseReview.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
