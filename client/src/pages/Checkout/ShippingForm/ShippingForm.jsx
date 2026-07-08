import { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./ShippingForm.module.css";
import { useCheckout } from "../../../context/CheckoutContext";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function ShippingForm() {
  const { user } = useAuth();
  const { checkoutData, setCheckoutData } = useCheckout();
  const [giftOpen, setGiftOpen] = useState(false);

  const defaultAddress =
    user?.addresses?.find((address) => address.isDefault) ||
    user?.addresses?.[0];

  useEffect(() => {
    if (!user) return;

    setCheckoutData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",

      address: defaultAddress?.street || "",
      city: defaultAddress?.city || "",
      state: defaultAddress?.state || "",
      pincode: defaultAddress?.pincode || "",
      country: defaultAddress?.country || "India",

      giftMessage: "",
    });
  }, [user]);

  const handleChange = (e) => {
    setCheckoutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {/* Contact */}
      <div className={styles.card}>
        <h2>Contact Information</h2>

        <div className={styles.grid}>
          <input
            name="name"
            placeholder="Full Name"
            value={checkoutData.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            value={checkoutData.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={checkoutData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address */}
      <div className={styles.card}>
        <h2>Shipping Address</h2>

        <textarea
          rows={2}
          name="address"
          placeholder="House No., Street, Area..."
          value={checkoutData.address}
          onChange={handleChange}
        />

        <div className={styles.grid}>
          <input
            name="city"
            placeholder="City"
            value={checkoutData.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={checkoutData.state}
            onChange={handleChange}
          />

          <input
            name="pincode"
            placeholder="PIN Code"
            value={checkoutData.pincode}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={checkoutData.country}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Gift */}
      <div className={styles.card}>
        <button
          className={styles.giftHeader}
          onClick={() => setGiftOpen((prev) => !prev)}
          type="button"
        >
          <span>🎁 Add a Gift Message (Optional)</span>

          <KeyboardArrowDownRoundedIcon
            className={`${styles.arrow} ${giftOpen ? styles.open : ""}`}
          />
        </button>

        {giftOpen && (
          <textarea
            rows={5}
            name="giftMessage"
            placeholder="Write your heartfelt message..."
            value={checkoutData.giftMessage}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
