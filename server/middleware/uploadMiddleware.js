import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;

// We'll use memoryStorage because the files are going straight to Cloudinary. No temporary files will be created.