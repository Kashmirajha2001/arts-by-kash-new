import CourseReview from "../models/CourseReview.js";
import CourseProgress from "../models/CourseProgress.js";
import Order from "../models/Order.js";

export const createOrUpdateReview = async (req, res) => {
  try {
    const { courseProductId, courseTitle, rating, title, comment } = req.body;

    // Verify purchase
    const order = await Order.findOne({
      user: req.user._id,
      paymentStatus: "paid",
      "items.productId": Number(courseProductId),
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "Purchase required before reviewing.",
      });
    }

    // Verify progress
    const progress = await CourseProgress.findOne({
      user: req.user._id,
      courseProductId: Number(courseProductId),
    });

    if (!progress || progress.percentage < 20) {
      return res.status(403).json({
        success: false,
        message: "Complete at least 20% of the course before reviewing.",
      });
    }

    let review = await CourseReview.findOne({
      user: req.user._id,
      courseProductId: Number(courseProductId),
    });

    if (review) {
      review.rating = rating;
      review.title = title;
      review.comment = comment;

      // Needs approval again
      review.approved = false;

      await review.save();
    } else {
      review = await CourseReview.create({
        user: req.user._id,
        userName: req.user.name,
        courseProductId: Number(courseProductId),
        courseTitle,
        rating,
        title,
        comment,
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find({
      courseProductId: Number(req.params.courseId),
      approved: true,
    })
      .populate("user", "avatar name")
      .sort({
        createdAt: -1,
      });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1);

    res.json({
      success: true,
      reviews,
      averageRating: Number(averageRating),
      totalReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyReview = async (req, res) => {
  try {
    const review = await CourseReview.findOne({
      user: req.user._id,
      courseProductId: Number(req.params.courseId),
    }).populate("user", "avatar name");

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

export const getReviewSummary = async (req, res) => {
  try {
    const summaries = await CourseReview.aggregate([
      {
        $match: {
          approved: true,
        },
      },
      {
        $group: {
          _id: "$courseProductId",

          averageRating: {
            $avg: "$rating",
          },

          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    const result = {};

    summaries.forEach((item) => {
      result[item._id] = {
        averageRating: Number(item.averageRating.toFixed(1)),
        totalReviews: item.totalReviews,
      };
    });

    res.json({
      success: true,
      summaries: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPublicReviews = async (req, res) => {
  try {
    const reviews = await CourseReview.find({
      approved: true,
    })
      .populate("user", "avatar name")
      .sort({
        createdAt: -1,
      })
      .limit(20);

    const stats = await CourseReview.aggregate([
      {
        $match: {
          approved: true,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      reviews,
      averageRating: stats.length
        ? Number(stats[0].averageRating.toFixed(1))
        : 0,
      totalReviews: stats.length ? stats[0].totalReviews : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
