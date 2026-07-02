import PaletteIcon from "@mui/icons-material/Palette";
import StraightenIcon from "@mui/icons-material/Straighten";
import GroupIcon from "@mui/icons-material/Group";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import FormInput from "../../../../components/ui/FormInput/FormInput";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import { isValidPhone, isValidEmail } from "../../../../utils/validation";

import pricing from "../../data/pricingData";

import styles from "./CommissionModal.module.css";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../../services/authService";

export default function CommissionModal({
  open,
  onClose,
  medium,
  size,
  people,
  price,
}) {

  if (!open) return null;
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const initialErrors = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // setFormData(initialFormData);
  // setErrors(initialErrors);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const remaining = 5 - images.length;

    const selected = files.slice(0, remaining);

    const previewImages = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setImages((prev) => [...prev, ...previewImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter((img) => img.id !== id);
    });
  };

  const handleClose = () => {
    setSubmitted(false);

    setImages([]);

    setFormData(initialFormData);
    setErrors(initialErrors);
    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email.";
      isValid = false;
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  useEffect(() => {
    if (!open) return;

    console.log("Modal opened");

    const fetchUser = async () => {
      try {
        setLoadingUser(true);

        const user = await getCurrentUser();

        console.log("Fetched User:", user);

        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [open]);

  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose}></div>

      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </button>

        <h2>Request a Commission</h2>
        <p className={styles.subtitle}>
          {loadingUser
            ? "Preparing your commission form..."
            : formData.name
              ? `Welcome back, ${formData.name.split(" ")[0]} 👋 We've already filled in your details.`
              : "Fill in a few details and we'll get back to you shortly."}
        </p>

        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successCircle}>✓</div>

            <h2>Request Sent Successfully!</h2>

            <p>
              Thank you for choosing
              <strong> Arts by Kash</strong>.
              <br />
              <br />
              Your commission request has been received. I'll personally review
              your enquiry and get back to you within
              <strong> 24–48 hours.</strong>
            </p>

            <PrimaryButton onClick={handleClose}>
              Continue Browsing
            </PrimaryButton>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGrid}>
              <FormInput
                label="Full Name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={loadingUser}
              />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={loadingUser}
              />

              <div className={styles.fullWidth}>
                <FormInput
                  label="Phone Number (Optional)"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  disabled={loadingUser}
                />
              </div>
            </div>

            <div className={styles.summaryCard}>
              <h4>Selected Artwork</h4>

              <div className={styles.summaryGrid}>
                <div>
                  {/* <PaletteIcon className={styles.icon} /> */}
                  🎨 <span>{pricing[medium].title}</span>
                </div>

                <div>
                  {/* <StraightenIcon className={styles.icon} /> */}
                  🖍️ <span>{size}</span>
                </div>

                <div>
                  {/* <GroupIcon className={styles.icon} /> */}
                  👥{" "}
                  <span>
                    {people === 1
                      ? "Single"
                      : people === 2
                        ? "Couple"
                        : `${people} People`}
                  </span>
                </div>

                <div>
                  {/* <CurrencyRupeeIcon className={styles.icon} /> */}
                  💰{" "}
                  <span>
                    {price === null
                      ? "Custom Quote"
                      : price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.fullWidth}>
              <label className={styles.textareaLabel}>Additional Details</label>

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us anything you'd like us to know about your artwork..."
                className={styles.textarea}
              />
            </div>

            {images.length > 0 && (
              <div className={styles.previewGrid}>
                {images.map((image) => (
                  <div key={image.id} className={styles.previewCard}>
                    <img src={image.preview} alt="" />

                    <button type="button" onClick={() => removeImage(image.id)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.uploadBox}>
              <CloudUploadOutlinedIcon className={styles.uploadIcon} />

              <h4>Upload Reference Images</h4>

              <p>
                {images.length === 5
                  ? "Maximum of 5 images selected."
                  : `${images.length}/5 images selected`}
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                disabled={images.length === 5}
                onChange={handleImageChange}
              />
            </div>

            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Request Commission"}
            </PrimaryButton>
          </form>
        )}
      </div>
    </>
  );
}
