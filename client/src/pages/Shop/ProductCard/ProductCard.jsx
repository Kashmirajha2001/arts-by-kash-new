import { FiHeart } from "react-icons/fi";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { useStore } from "../../../context/StoreContext";

export default function ProductCard({ product }) {
  const buttonText = product.type === "course" ? "Enroll Now" : "Add to Cart";
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useStore();

  const wishlisted = isWishlisted(product.id);

  const handleCardClick = () => {
    if (product.type === "course") {
      navigate("/courses");
      return;
    }
    navigate(`/shop/${product.id}`);
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        {product.badge && <span className={styles.badge}>{product.badge}</span>}

        <button
          className={styles.wishlist}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          {wishlisted ? <FaHeart /> : <FiHeart />}
        </button>

        <img
          src={product.image[0]}
          alt={product.title}
          className={styles.image}
        />
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

          {/* <PrimaryButton>{buttonText}</PrimaryButton> */}
          <PrimaryButton
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
}
