import { Link, useParams } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./OrderSuccess.module.css";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <section className={styles.success}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>

        <h1>Payment Successful!</h1>

        <p>
          Thank you for shopping with <strong>Arts by Kash</strong>.
        </p>

        <p>Your order has been placed successfully.</p>

        <div className={styles.orderId}>
          Order ID
          <strong>{id}</strong>
        </div>

        <div className={styles.buttons}>
          <Link to="/shop">
            <PrimaryButton>Continue Shopping</PrimaryButton>
          </Link>

          <Link to="/profile/orders">
            <PrimaryButton secondary>View Orders</PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
