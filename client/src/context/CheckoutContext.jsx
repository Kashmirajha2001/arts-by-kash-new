import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",

    addressId: "",

    giftMessage: "",

    paymentMethod: "razorpay",
  });

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
