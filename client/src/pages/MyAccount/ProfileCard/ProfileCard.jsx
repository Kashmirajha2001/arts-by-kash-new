import { useEffect, useState } from "react";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import { getCurrentUser } from "../../../services/authService";

import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user);
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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />

        <div>
          <span className={styles.welcome}>Welcome back 👋</span>

          <h2>{user.name}</h2>
        </div>
      </div>

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
            {user.address?.city
              ? `${user.address.city}, ${user.address.state}`
              : "Add your address"}
          </span>
        </div>

        <div>
          <CalendarMonthOutlinedIcon />

          <span>Member since {joinedDate}</span>
        </div>
      </div>

      <PrimaryButton>
        <EditOutlinedIcon fontSize="small" />
        Edit Profile
      </PrimaryButton>
    </div>
  );
}
