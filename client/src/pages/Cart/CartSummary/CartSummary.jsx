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

        <div className={styles.shipping}>
          <span>🚚 Calculated at checkout</span>
          <span className={styles.freeShipping}>
            Free delivery on orders above 3000
          </span>
        </div>
      </div>

      <hr />

      <div className={styles.total}>
        <span>Total</span>

        <strong>₹{subtotal.toLocaleString()}</strong>
      </div>

      {/* <div className={styles.dispatch}>
        <span>Estimated Dispatch</span>

        <strong>2–4 Business Days</strong>
      </div> */}

      <div className={styles.btn}>
        <PrimaryButton to="/checkout">Proceed to Checkout</PrimaryButton>
      </div>

      <SecondaryButton onClick={() => navigate("/shop")}>
        Continue Shopping
      </SecondaryButton>
    </aside>
  );
}
