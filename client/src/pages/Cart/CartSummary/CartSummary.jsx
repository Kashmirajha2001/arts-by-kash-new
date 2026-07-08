import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton/SecondaryButton";

import styles from "./CartSummary.module.css";

export default function CartSummary({ subtotal }) {
  const navigate = useNavigate();

  return (
    <aside className={styles.summary}>
      <h3>Order Summary</h3>

      <div className={styles.row}>
        <span>Subtotal</span>

        <strong>₹{subtotal.toLocaleString()}</strong>
      </div>

      <div className={styles.row}>
        <span>Shipping</span>

        <span>Calculated at checkout</span>
      </div>

      <hr />

      <div className={styles.total}>
        <span>Total</span>

        <strong>₹{subtotal.toLocaleString()}</strong>
      </div>

      <PrimaryButton to="/checkout">Proceed to Checkout</PrimaryButton>

      <SecondaryButton onClick={() => navigate("/shop")}>
        Continue Shopping
      </SecondaryButton>
    </aside>
  );
}
