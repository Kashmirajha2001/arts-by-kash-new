import { useEffect, useState } from "react";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import IconButton from "@mui/material/IconButton";

import FormInput from "../../../components/ui/FormInput/FormInput";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import { getCurrentUser, updateProfile } from "../../../services/authService";
import useAuth from "../../../hooks/useAuth";
import { showSuccess, showError } from "../../../utils/toast";
import { isValidPhone } from "../../../utils/validation";
import AddressesTab from "../AddressesTab/AddressesTab";

import { useNavigate } from "react-router-dom";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  // const [editData, setEditData] = useState({
  //   name: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  //   country: "",
  // });

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.user);

        const defaultAddress =
          response.user.addresses?.find((address) => address.isDefault) || {};

        setEditData({
          name: response.user.name || "",
          phone: response.user.phone || "",
          street: defaultAddress.street || "",
          city: defaultAddress.city || "",
          state: defaultAddress.state || "",
          pincode: defaultAddress.pincode || "",
          country: defaultAddress.country || "India",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCancel = () => {
    const address = user.addresses?.find((address) => address.isDefault) || {};

    setEditData({
      name: user.name || "",
      phone: user.phone || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
    });

    setErrors({
      name: "",
      phone: "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await updateProfile(editData);
      setUser(response.user);
      setIsEditing(false);
      showSuccess("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      showError("Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      showSuccess("You have been successfully logged out!");

      navigate("/");
    } catch (error) {
      console.log(error);

      showError("Unable to logout.");
    }
  };

  const defaultAddress =
    user.addresses?.find((address) => address.isDefault) || {};

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
    };

    let isValid = true;

    if (!editData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (editData.name.trim().length < 2) {
      newErrors.name = "Name is too short.";
      isValid = false;
    }

    if (!isValidPhone(editData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  return (
    <div className={styles.card}>
      {/* Logout — top right corner */}
      <IconButton className={styles.logoutBtn} onClick={handleLogout}>
        <LogoutRoundedIcon fontSize="small" />
      </IconButton>

      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <div className={styles.headerContent}>
          <span className={styles.welcome}>Welcome back 👋</span>
          <h2>{user.name}</h2>
        </div>
      </div>

      {/* ================= INFO ================= */}
      <div className={styles.content}>
        <div className={styles.infoGrid}>
          {/* Email — not editable */}
          <div>
            <EmailOutlinedIcon />
            <span>{user.email}</span>
          </div>

          {/* Phone — inline editable */}
          <div className={styles.phoneRow}>
            <PhoneOutlinedIcon />

            {isEditing ? (
              <FormInput
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+91 XXXXX XXXXX"
              />
            ) : (
              <span>{user.phone || "Add phone number"}</span>
            )}

            {isEditing ? (
              <div className={styles.phoneActions}>
                <button className={styles.cancelInline} onClick={handleCancel}>
                  Cancel
                </button>
                <PrimaryButton onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </PrimaryButton>
              </div>
            ) : (
              <IconButton
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
                size="small"
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>

        {/* Addresses full width below */}
        <div className={styles.addressSection}>
          <AddressesTab />
        </div>
      </div>
    </div>
  );
}
