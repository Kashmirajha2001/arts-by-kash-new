import PageHero from "../../components/shared/PageHero/PageHero";

import HeroImage from "../../assets/images/hero/courses-hero.jpg";

import { useStore } from "../../context/StoreContext";

import ProductCard from "../Shop/ProductCard/ProductCard";
import Loader from "../../components/ui/Loader/Loader";
import useProducts from "../../hooks/useProducts";

import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { wishlist } = useStore();
  const { products, loading } = useProducts();

  if (loading) return <Loader />;

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <>
      <PageHero
        title="Wishlist"
        breadcrumb="Your saved favourites"
        image={HeroImage}
      />

      <section className={styles.section}>
        {wishlistProducts.length === 0 ? (
          <div className={styles.empty}>
            <h2>No saved artworks yet.</h2>
            <p>Save artworks and prints to view them later.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
