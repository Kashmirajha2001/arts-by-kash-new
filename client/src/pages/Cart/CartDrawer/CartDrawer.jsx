import { AnimatePresence, motion } from "framer-motion";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useStore } from "../../../context/StoreContext";
import CartItem from "../CartItem/CartItem";
import shopData from "../../../pages/Shop/data/shopData";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import styles from "./CartDrawer.module.css";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

export default function CartDrawer() {
  const { cartProducts, subtotal, cartOpen, closeCart } = useStore();
  const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   closeCart();
  // }, [location.pathname]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
            }}
          >
            <div className={styles.header}>
              <h2>Your Art Collection</h2>

              <button onClick={closeCart}>
                <CloseRoundedIcon />
              </button>
            </div>

            <div className={styles.items}>
              {cartProducts.length === 0 ? (
                <div className={styles.empty}>
                  <h3>Your cart is empty.</h3>

                  <p>Add artworks to begin your collection.</p>
                </div>
              ) : (
                cartProducts.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.total}>
                  <span>Subtotal</span>

                  <strong>₹{subtotal.toLocaleString()}</strong>
                </div>
                {/* <PrimaryButton to="/cart">View Cart</PrimaryButton> */}
                <PrimaryButton onClick=
                {() => {
                  closeCart();
                  navigate("/cart");
                }}>View Cart</PrimaryButton>
                <PrimaryButton>Checkout</PrimaryButton>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
