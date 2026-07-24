import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllOrders } from "../../../services/adminService";
import Loader from "../../../components/ui/Loader/Loader";
import styles from "./AdminOrders.module.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1>Orders</h1>

        <span>{orders.length} Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <h3>No orders found.</h3>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>

                  <td>{order.customer.name}</td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  <td>₹{order.total.toLocaleString()}</td>

                  <td>
                    <span
                      className={`${styles.badge} ${
                        order.paymentStatus === "paid"
                          ? styles.paid
                          : styles.pending
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <span className={styles.status}>{order.orderStatus}</span>
                  </td>

                  <td>
                    <Link
                      className={styles.viewBtn}
                      to={`/admin/orders/${order._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
