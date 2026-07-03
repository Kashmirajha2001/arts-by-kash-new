import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import generateCommissionId from "../utils/generateCommissionId.js";
import commissionEmail from "../templates/commissionEmail.js";
import sendEmail from "../utils/sendEmail.js";

export const submitCommission = async (req, res) => {
  const commissionId = generateCommissionId();

  const folder = `arts-by-kash/commissions/${commissionId}`;
  const uploadedImages = [];

  for (const file of req.files) {
    const result = await uploadToCloudinary(file.buffer, folder);

    uploadedImages.push(result.secure_url);
  }

  const html = commissionEmail({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    medium: req.body.medium,
    size: req.body.size,
    people: req.body.people,
    price: req.body.price,
    message: req.body.message,
    images: uploadedImages,
  });

  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "🎨 New Commission Request",
    html,
  });

  return res.status(200).json({
    success: true,
    message: "Commission request submitted successfully.",
  });
};
