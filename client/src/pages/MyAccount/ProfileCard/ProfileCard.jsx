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

import { useNavigate } from "react-router-dom";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
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
  };

  const handleCancel = () => {
    setEditData({
      name: user.name || "",
      phone: user.phone || "",
      street: user.address?.street || "",
      city: user.address?.city || "",
      state: user.address?.state || "",
      pincode: user.address?.pincode || "",
      country: user.address?.country || "India",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await updateProfile(editData);

      setUser(response.user);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();

      showSuccess("You have been successfully logged out!");

      navigate("/");
    } catch (error) {
      console.log(error);

      showError("Failed to logout.");
    }
  };

  const defaultAddress =
    user.addresses?.find((address) => address.isDefault) || {};

  return (
    <div className={styles.card}>
      {/* ================= HEADER ================= */}

      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />

        <div className={styles.headerContent}>
          <span className={styles.welcome}>Welcome back 👋</span>

          {isEditing ? (
            <FormInput
              name="name"
              value={editData.name}
              onChange={handleChange}
            />
          ) : (
            <h2>{user.name}</h2>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      {isEditing ? (
        <div className={styles.editForm}>
          <FormInput
            label="Phone Number"
            name="phone"
            value={editData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
          />

          <div className={styles.fullWidth}>
            <FormInput
              label="Street Address"
              name="street"
              value={editData.street}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label="City"
            name="city"
            value={editData.city}
            onChange={handleChange}
          />

          <FormInput
            label="State"
            name="state"
            value={editData.state}
            onChange={handleChange}
          />

          <FormInput
            label="PIN Code"
            name="pincode"
            value={editData.pincode}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className={styles.infoGrid}>
          <div>
            <EmailOutlinedIcon />
            <span>{user.email}</span>
          </div>

          <div>
            <PhoneOutlinedIcon />
            <span>{user.phone || "Add phone number"}</span>
          </div>

          <div>
            <LocationOnOutlinedIcon />
            <span>
              {defaultAddress.city
                ? `${defaultAddress.city}, ${defaultAddress.state}`
                : "Add your address"}
            </span>
          </div>

          <div>
            <CalendarMonthOutlinedIcon />
            <span>Member since {joinedDate}</span>
          </div>
        </div>
      )}

      {/* ================= ACTIONS ================= */}

      {isEditing ? (
        <div className={styles.editActions}>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>

          <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
        </div>
      ) : (
        <div className={styles.actions}>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditOutlinedIcon />
          </IconButton>

          <IconButton onClick={handleLogout}>
            <LogoutRoundedIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
