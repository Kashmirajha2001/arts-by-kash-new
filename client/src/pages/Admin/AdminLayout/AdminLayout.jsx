import { Link, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>Arts by Kash</h2>

        <Link to="/admin">Dashboard</Link>

        <Link to="/admin/orders">Orders</Link>

        <Link to="/admin/products">Products</Link>

        <Link to="/admin/assignments">Assignments</Link>

        <Link to="/admin/reviews">Reviews</Link>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
