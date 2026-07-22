import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export default function CheckoutProvider({ children }) {
  
  const initialCheckoutData = {
    name: "",
    email: "",
    phone: "",
    addressId: "",
    giftMessage: "",
    paymentMethod: "razorpay",
  };

  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);

  const resetCheckout = () => {
    setCheckoutData(initialCheckoutData);
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        setCheckoutData,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
