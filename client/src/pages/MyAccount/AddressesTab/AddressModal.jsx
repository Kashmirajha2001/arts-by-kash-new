import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { addAddress, updateAddress } from "../../../services/addressService";
import { showSuccess, showError } from "../../../utils/toast";
import useAuth from "../../../hooks/useAuth";

import styles from "./AddressModal.module.css";

const empty = {
  label: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

export default function AddressModal({ address, onClose, onSaved }) {
  const { loadUser } = useAuth();

  const isEdit = Boolean(address);

  const [form, setForm] = useState(
    isEdit
      ? {
          label: address.label || "",
          street: address.street || "",
          city: address.city || "",
          state: address.state || "",
          pincode: address.pincode || "",
          country: address.country || "India",
          isDefault: address.isDefault || false,
        }
      : empty,
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const LABEL_CHIPS = [
    { value: "Home", emoji: "🏠" },
    { value: "Office", emoji: "🏢" },
    { value: "Parents", emoji: "👪" },
    { value: "Gift", emoji: "🎁" },
    { value: "Other", emoji: "✏️" },
  ];

  // inside component, replace label state logic:
  const isOther =
    form.label && !LABEL_CHIPS.slice(0, -1).find((c) => c.value === form.label);

  const handleChip = (value) => {
    setForm((prev) => ({ ...prev, label: value === "Other" ? "" : value }));
    setErrors((prev) => ({ ...prev, label: "" }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.label.trim()) e.label = "Label is required.";
    if (!form.street.trim()) e.street = "Street is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (!form.pincode.trim()) e.pincode = "PIN Code is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = isEdit
        ? await updateAddress(address._id, form)
        : await addAddress(form);
      await loadUser();
      showSuccess(isEdit ? "Address updated!" : "Address added!");
      onSaved(res.data.addresses);
    } catch {
      showError("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className={styles.modalHeader}>
          <h3>{isEdit ? "Edit Address" : "Add New Address"}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseRoundedIcon fontSize="small" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* replace the label .field div with: */}
          <div className={`${styles.field} ${styles.full}`}>
            <label>Address Label</label>

            <div className={styles.chips}>
              {LABEL_CHIPS.map((chip) => {
                const isActive =
                  chip.value === "Other" ? isOther : form.label === chip.value;

                return (
                  <button
                    key={chip.value}
                    type="button"
                    className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                    onClick={() => handleChip(chip.value)}
                  >
                    {chip.emoji} {chip.value}
                  </button>
                );
              })}
            </div>

            {isOther && (
              <input
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="Custom label..."
                className={styles.customLabel}
                autoFocus
              />
            )}

            {errors.label && <p className={styles.error}>{errors.label}</p>}
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label>Street Address</label>
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="59 Lake Road"
            />
            {errors.street && <p className={styles.error}>{errors.street}</p>}
          </div>

          <div className={styles.field}>
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Kolkata"
            />
            {errors.city && <p className={styles.error}>{errors.city}</p>}
          </div>

          <div className={styles.field}>
            <label>State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="West Bengal"
            />
            {errors.state && <p className={styles.error}>{errors.state}</p>}
          </div>

          <div className={styles.field}>
            <label>PIN Code</label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="700061"
            />
            {errors.pincode && <p className={styles.error}>{errors.pincode}</p>}
          </div>

          <div className={styles.field}>
            <label>Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.checkRow} ${styles.full}`}>
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            <label htmlFor="isDefault">Make this my default address</label>
          </div>

          <div className={`${styles.modalActions} ${styles.full}`}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
