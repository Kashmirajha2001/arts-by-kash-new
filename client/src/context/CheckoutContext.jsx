import { createContext, useContext, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";

const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const { user } = useAuth();

  const [checkoutData, setCheckoutData] = useState({
    addressId: "",
    giftMessage: "",
    paymentMethod: "razorpay",
  });

  useEffect(() => {
    if (!user) return;

    const defaultAddress =
      user.addresses?.find((address) => address.isDefault) ||
      user.addresses?.[0];

    setCheckoutData({
      addressId: defaultAddress?._id || "",
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
