import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import useAuth from "../../../hooks/useAuth";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import { useCheckout } from "../../../context/CheckoutContext";

import styles from "./ShippingForm.module.css";

export default function ShippingForm() {
  const { user } = useAuth();
  const { checkoutData, setCheckoutData } = useCheckout();
  const [giftOpen, setGiftOpen] = useState(false);
  const navigate = useNavigate();

  const defaultAddress =
    user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  useEffect(() => {
    if (!user) return;
    // console.log(user);

    setCheckoutData((prev) => ({
      ...prev,

      name: user.name || "",

      email: user.email || "",

      phone: user.phone || "",

      address: defaultAddress?.street || "",

      city: defaultAddress?.city || "",

      state: defaultAddress?.state || "",

      pincode: defaultAddress?.pincode || "",

      country: defaultAddress?.country || "India",

      addressId: defaultAddress?._id || prev.addressId,
    }));

    // console.log(checkoutData);
  }, [user, defaultAddress]);

  const handleChange = (e) => {
    setCheckoutData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectAddress = (address) => {
    setCheckoutData((prev) => ({
      ...prev,
      addressId: address._id,
      address: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
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
      {/* Address */}
      <div className={styles.card}>
        <h2>Shipping Address</h2>

        <div className={styles.addressList}>
          {user?.addresses?.map((address) => {
            const isSelected = checkoutData.addressId === address._id;
            return (
              <div
                key={address._id}
                className={`${styles.addressCard} ${isSelected ? styles.active : ""}`}
                onClick={() => selectAddress(address)}
              >
                <div className={styles.check}>
                  {isSelected && (
                    <CheckCircleRoundedIcon className={styles.checkIcon} />
                  )}
                </div>

                <div className={styles.addressBody}>
                  {address.isDefault && (
                    <span className={styles.defaultBadge}>Default</span>
                  )}
                  <p className={styles.street}>{address.street}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>
                    {address.pincode}, {address.country}
                  </p>
                </div>
              </div>
            );
          })}

          {/* no addresses yet */}
          {user?.addresses?.length === 0 && (
            <p className={styles.noAddress}>No saved addresses yet.</p>
          )}
        </div>

        <button
          className={styles.addAddress}
          onClick={() => navigate("/my-account?tab=addresses")}
          type="button"
        >
          <AddRoundedIcon fontSize="small" />
          Add New Address
        </button>
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
            onChange={(e) =>
              setCheckoutData((prev) => ({
                ...prev,
                giftMessage: e.target.value,
              }))
            }
          />
        )}
      </div>
    </div>
  );
}
