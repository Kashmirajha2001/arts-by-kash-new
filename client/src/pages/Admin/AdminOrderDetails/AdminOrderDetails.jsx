import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getOrderById,
  updateOrderStatus,
} from "../../../services/adminService";

import Loader from "../../../components/ui/Loader/Loader";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import { showSuccess, showError } from "../../../utils/toast";

import styles from "./AdminOrderDetails.module.css";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(id);

        setOrder(data);
        setStatus(data.orderStatus);
      } catch (error) {
        console.log(error);
        showError("Unable to load order.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedOrder = await updateOrderStatus(id, status);

      setOrder(updatedOrder);

      showSuccess("Order updated successfully.");
    } catch (error) {
      console.log(error);

      showError("Unable to update order.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  if (!order) return <h2>Order not found.</h2>;

  return (
    <section className={styles.container}>
      <Link to="/admin/orders" className={styles.back}>
        ← Back to Orders
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1>{order.orderNumber}</h1>

            <p>
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className={styles.badges}>
            <span className={styles.payment}>{order.paymentStatus}</span>

            <span className={styles.status}>{order.orderStatus}</span>
          </div>
        </div>

        {/* Customer */}

        <div className={styles.section}>
          <h2>Customer</h2>

          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>

          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>

          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
        </div>

        {/* Address */}

        <div className={styles.section}>
          <h2>Shipping Address</h2>

          <p>{order.shippingAddress.label}</p>

          <p>{order.shippingAddress.street}</p>

          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>

          <p>
            {order.shippingAddress.pincode}, {order.shippingAddress.country}
          </p>
        </div>

        {/* Items */}

        <div className={styles.section}>
          <h2>Items</h2>

          {order.items.map((item) => (
            <div key={item.productId} className={styles.item}>
              <img src={item.image} alt={item.title} />

              <div className={styles.info}>
                <h3>{item.title}</h3>

                <p>
                  ₹{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>

              <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
            </div>
          ))}
        </div>

        {/* Payment */}

        <div className={styles.section}>
          <h2>Payment</h2>

          <p>
            <strong>Method:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Payment ID:</strong> {order.razorpayPaymentId || "-"}
          </p>

          <p>
            <strong>Status:</strong> {order.paymentStatus}
          </p>
        </div>

        {/* Totals */}

        <div className={styles.section}>
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

          <div className={styles.row}>
            <span>Total</span>

            <strong>₹{order.total.toLocaleString()}</strong>
          </div>
        </div>

        {/* Gift */}

        {order.giftMessage && (
          <div className={styles.section}>
            <h2>Gift Message</h2>

            <p>{order.giftMessage}</p>
          </div>
        )}

        {/* Admin */}

        <div className={styles.section}>
          <h2>Update Order Status</h2>

          <div className={styles.actions}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>

              <option value="confirmed">Confirmed</option>

              <option value="processing">Processing</option>

              <option value="shipped">Shipped</option>

              <option value="delivered">Delivered</option>

              <option value="cancelled">Cancelled</option>
            </select>

            <PrimaryButton onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
