export const submitCommission = async (req, res) => {
  const uploadedImages = [];

  for (const file of req.files) {
    const result = await uploadToCloudinary(file.buffer);

    uploadedImages.push(result.secure_url);
  }

  console.log(uploadedImages);

  // res.status(200).json({
  //   success: true,
  // });

  return res.status(200).json({
    success: true,
    images: uploadedImages,
  });
};
