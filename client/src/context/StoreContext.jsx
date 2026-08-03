/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/toast";
import { useMemo } from "react";

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
import useProducts from "../hooks/useProducts";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const { user } = useAuth();
  const { products, loading: productsLoading } = useProducts();

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlist([]);
    }
  }, [user]);

  const resetCart = async () => {
    try {
      const response = await getCart();
      setCart(response.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetCart();
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

  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);

        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [cartProducts]);

  const isInCart = (id) => {
    return cart.some((item) => item.productId === id);
  };

  const shipping = subtotal >= 3000 ? 0 : 199;

  const total = subtotal + shipping;

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
        subtotal,
        cartProducts,
        shipping,
        total,

        resetCart,

        products,
        productsLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
