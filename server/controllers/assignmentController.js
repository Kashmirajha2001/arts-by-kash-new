import Assignment from "../models/Assignment.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

export const submitAssignment = async (req, res) => {
  try {
    const { courseProductId, lessonId, assignmentTitle, notes } = req.body;

    let assignment = await Assignment.findOne({
      user: req.user._id,
      courseProductId: Number(courseProductId),
      lessonId,
    });

    const uploadedFiles = [];

    const folder = `arts-by-kash/assignments/${req.user.name}-${req.user._id}/course-${courseProductId}`;

    if (req.files?.length) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer, {
          folder,
          public_id: `lesson-${lessonId}-${Date.now()}`,
          resource_type: "auto",
        });

        uploadedFiles.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        });
      }
    }

    if (assignment) {
      assignment.files = uploadedFiles;
      assignment.notes = notes;
      assignment.assignmentTitle = assignmentTitle;
      assignment.status = "submitted";
      assignment.feedback = "";

      await assignment.save();
    } else {
      assignment = await Assignment.create({
        user: req.user._id,
        userName: req.user.name,
        courseProductId: Number(courseProductId),
        lessonId,
        assignmentTitle,
        notes,
        files: uploadedFiles,
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment submitted successfully.",
      assignment,
    });
  } catch (error) {
    console.error("========== ASSIGNMENT ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      user: req.user._id,
      courseProductId: Number(req.params.courseId),
      lessonId: req.params.lessonId,
    });

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    for (const file of assignment.files) {
      await cloudinary.uploader.destroy(file.public_id, {
        resource_type: "auto",
      });
    }

    await assignment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
