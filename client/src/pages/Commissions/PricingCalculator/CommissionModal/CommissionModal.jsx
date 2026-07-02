import PaletteIcon from "@mui/icons-material/Palette";
import StraightenIcon from "@mui/icons-material/Straighten";
import GroupIcon from "@mui/icons-material/Group";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import FormInput from "../../../../components/ui/FormInput/FormInput";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import pricing from "../../data/pricingData";

import styles from "./CommissionModal.module.css";
import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // later we'll call the API here

    setTimeout(() => {
      setSubmitted(true);
    }, 800);
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

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>

      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>

        <h2>Request a Commission</h2>

        <p className={styles.subtitle}>
          Fill in a few details and we'll get back to you shortly.
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

            <PrimaryButton onClick={onClose}>Continue Browsing</PrimaryButton>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGrid}>
              <FormInput label="Full Name" name="name" placeholder="John Doe" />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
              />

              <div className={styles.fullWidth}>
                <FormInput
                  label="Phone Number (Optional)"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
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
            {/* {images.length > 0 && (
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
          )} */}

            <PrimaryButton type="submit">Request Commission</PrimaryButton>
          </form>
        )}
      </div>
    </>
  );
}
