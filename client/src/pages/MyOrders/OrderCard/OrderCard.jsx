import { Link } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./OrderCard.module.css";

export default function OrderCard({ order }) {
  const item = order.items[0];

  return (
    <article className={styles.card}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <div className={styles.content}>
        <h3>{item.title}</h3>

        <p>
          {order.items.length} {order.items.length === 1 ? "item" : "items"}
        </p>

        <span className={styles.date}>
          Ordered on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className={styles.summary}>
        <h3>₹{order.total.toLocaleString()}</h3>

        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.paid}`}>
            {order.paymentStatus}
          </span>

          <span className={`${styles.badge} ${styles.confirmed}`}>
            {order.orderStatus}
          </span>
        </div>

        <Link to={`/orders/${order._id}`}>
          <PrimaryButton>View Details</PrimaryButton>
        </Link>
      </div>
    </article>
  );
}
