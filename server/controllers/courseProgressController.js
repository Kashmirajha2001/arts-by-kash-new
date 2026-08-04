import CourseProgress from "../models/CourseProgress.js";

const TOTAL_LESSONS = {
  101: 24,
};

const calculateProgress = (courseId, completedLessons) => {
  const totalLessons = TOTAL_LESSONS[courseId] || 0;

  const completedCount = completedLessons.length;

  const remainingLessons = Math.max(totalLessons - completedCount, 0);

  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    completedCount,
    remainingLessons,
    percentage,
  };
};

export const getCourseProgress = async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    let progress = await CourseProgress.findOne({
      user: req.user._id,
      courseProductId: courseId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        courseProductId: courseId,
      });
    }

    const stats = calculateProgress(courseId, progress.completedLessons);

    res.json({
      success: true,
      progress: {
        ...progress.toObject(),
        ...stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markLessonComplete = async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    const { lessonId } = req.body;

    let progress = await CourseProgress.findOne({
      user: req.user._id,
      courseProductId: courseId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        courseProductId: courseId,
      });
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    const stats = calculateProgress(courseId, progress.completedLessons);

    progress.percentage = stats.percentage;

    if (stats.percentage === 100 && !progress.completedAt) {
      progress.completedAt = new Date();
    }

    await progress.save();

    res.json({
      success: true,
      progress: {
        ...progress.toObject(),
        ...stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLastLesson = async (req, res) => {
  try {
    const courseId = Number(req.params.courseId);

    const { lessonId } = req.body;

    let progress = await CourseProgress.findOne({
      user: req.user._id,
      courseProductId: courseId,
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        courseProductId: courseId,
      });
    }

    progress.lastAccessedLesson = lessonId;

    await progress.save();

    const stats = calculateProgress(courseId, progress.completedLessons);

    res.json({
      success: true,
      progress: {
        ...progress.toObject(),
        ...stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
