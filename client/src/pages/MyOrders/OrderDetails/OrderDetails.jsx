import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getOrderById } from "../../../services/orderService";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./OrderDetails.module.css";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) return <h2 className={styles.loading}>Loading...</h2>;

  if (!order) return <h2 className={styles.loading}>Order not found.</h2>;

  return (
    <section className={styles.container}>
      <Link to="/orders" className={styles.back}>
        ← Back to My Orders
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>Order Details</h1>

            <p className={styles.orderId}>
              Order #{order._id.slice(-8).toUpperCase()}
            </p>

            <span className={styles.date}>
              Ordered on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles.paid}`}>
              {order.paymentStatus}
            </span>

            <span className={`${styles.badge} ${styles.confirmed}`}>
              {order.orderStatus}
            </span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Items</h2>

          {order.items.map((item) => (
            <div key={item.productId} className={styles.item}>
              <img src={item.image} alt={item.title} />

              <div className={styles.itemInfo}>
                <h3>{item.title}</h3>

                <p>
                  ₹{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>

              <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2>Shipping Address</h2>

          <p>{order.customer.name}</p>

          <p>{order.customer.phone}</p>

          <p>{order.shippingAddress.address}</p>

          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>

          <p>{order.shippingAddress.pincode}</p>

          <p>{order.shippingAddress.country}</p>
        </section>

        <section className={styles.section}>
          <h2>Payment Information</h2>

          <div className={styles.row}>
            <span>Method</span>

            <strong>{order.paymentMethod}</strong>
          </div>

          <div className={styles.row}>
            <span>Payment ID</span>

            <strong>{order.razorpayPaymentId}</strong>
          </div>

          <div className={styles.row}>
            <span>Status</span>

            <strong>{order.paymentStatus}</strong>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Price Details</h2>

          <div className={styles.row}>
            <span>Subtotal</span>

            <strong>₹{order.subtotal.toLocaleString()}</strong>
          </div>

          <div className={styles.row}>
            <span>Shipping</span>

            <strong>
              {order.shippingCharge === 0
                ? "FREE"
                : `₹${order.shippingCharge.toLocaleString()}`}
            </strong>
          </div>

          <hr />

          <div className={styles.row}>
            <strong>Total</strong>

            <strong>₹{order.total.toLocaleString()}</strong>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Gift Message</h2>

          <p>{order.giftMessage || "No gift message added."}</p>
        </section>

        <div className={styles.actions}>
          <Link to="/shop">
            <PrimaryButton>Continue Shopping</PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
