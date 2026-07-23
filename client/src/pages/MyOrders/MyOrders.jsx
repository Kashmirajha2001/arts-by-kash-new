import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderService";
import OrderCard from "./OrderCard/OrderCard";
import styles from "./MyOrders.module.css";
import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <PageHero
        title="My Orders"
        // breadcrumb="Original artworks, prints & courses"
        image={HeroImage}
      />
      <div className={styles.container}>
        {/* <h1 className={styles.title}>My Orders</h1> */}

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <h2>No Orders Yet</h2>
            <p>Looks like you haven't purchased any artwork yet.</p>
            <Link to="/shop">
              <PrimaryButton>Explore Collection</PrimaryButton>
            </Link>
          </div>
        ) : (
          <div className={styles.orders}>
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
