import { FiHeart } from "react-icons/fi";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}

        <button className={styles.wishlist}>
          <FiHeart />
        </button>

        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>
          {product.type === "artwork"
            ? "Original Artwork"
            : product.type === "print"
              ? "Fine Art Print"
              : "Course"}
        </span>

        <h3>{product.title}</h3>

        <div className={styles.bottom}>
          <span className={styles.price}>
            ₹{product.price.toLocaleString()}
          </span>

          <PrimaryButton>View Details</PrimaryButton>
        </div>
      </div>
    </article>
  );
}
