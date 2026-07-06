import { createContext, useContext, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/toast";

import {
  getWishlist,
  toggleWishlist as toggleWishlistApi,
} from "../services/wishlistService";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);

  const toggleWishlist = async (id) => {
    if (!user) {
      showError("Please login to save wishlists.");
      return;
    }

    try {
      const response = await toggleWishlistApi(id);

      setWishlist(response.wishlist);

      showSuccess(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const isWishlisted = (id) => {
    return wishlist.includes(id);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await getWishlist();
        setWishlist(response.wishlist);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  return (
    <StoreContext.Provider
      value={{
        wishlist,
        cart,

        toggleWishlist,

        isWishlisted,

        addToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
