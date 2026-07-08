import { createContext, useContext, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/toast";

import {
  getWishlist,
  toggleWishlist as toggleWishlistApi,
} from "../services/wishlistService";

import {
  getCart,
  addToCart as addToCartApi,
  updateCartQuantity as updateCartQuantityApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "../services/cartService";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => setCartOpen(true);

  const closeCart = () => setCartOpen(false);

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

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart();

        setCart(response.cart);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      showError("Please login to continue.");
      return;
    }

    try {
      const response = await addToCartApi(productId, quantity);

      setCart(response.cart);

      showSuccess(response.message);

      setCartOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await updateCartQuantityApi(productId, quantity);

      setCart(response.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await removeFromCartApi(productId);

      setCart(response.cart);

      showSuccess("Removed from cart.");
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();

      setCart([]);

      showSuccess("Cart cleared.");
    } catch (error) {
      console.log(error);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (id) => {
    return cart.some((item) => item.productId === id);
  };

  return (
    <StoreContext.Provider
      value={{
        wishlist,
        cart,

        cartOpen,

        cartCount,

        toggleWishlist,

        isWishlisted,

        addToCart,

        updateCartQuantity,

        removeFromCart,

        clearCart,

        openCart,

        closeCart,
        isInCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
