import CourseReview from "../models/CourseReview.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find()
      .populate("user", "name avatar email")
      .sort({ createdAt: -1 });

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

export const getReview = async (req, res) => {
  try {
    const review = await CourseReview.findById(req.params.id).populate(
      "user",
      "name avatar email",
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

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

export const updateReview = async (req, res) => {
  try {
    const { approved } = req.body;

    const review = await CourseReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    review.approved = approved;

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
    const review = await CourseReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    await review.deleteOne();

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
