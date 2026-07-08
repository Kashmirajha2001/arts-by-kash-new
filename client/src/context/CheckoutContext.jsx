import { createContext, useContext, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";

const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const { user } = useAuth();

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",

    giftMessage: "",

    paymentMethod: "razorpay",
  });

  useEffect(() => {
    if (!user) return;

    const defaultAddress =
      user.addresses?.find((address) => address.isDefault) ||
      user.addresses?.[0];

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

      paymentMethod: "razorpay",
    });
  }, [user]);

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        setCheckoutData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
