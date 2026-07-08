import { FiHeart } from "react-icons/fi";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { useStore } from "../../../context/StoreContext";
import { showError } from "../../../utils/toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useStore();
  const { addToCart, isInCart } = useStore();

  const inCart = isInCart(product.id);
  const buttonText =
    product.type === "course"
      ? "Enroll Now"
      : inCart
        ? "🛒 Go to Cart"
        : "🛒 Add to Cart";

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

          {product.stock > 0 ? (
            <>
              <PrimaryButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.type === "course") {
                    navigate("/courses");
                    return;
                  }
                  if (inCart) {
                    navigate("/cart");
                    // Later we'll change this to openCart()
                    return;
                  }
                  addToCart(product.id);
                }}
              >
                {buttonText}
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                showError("Item is Sold out");
              }}
            >
              Sold Out
            </PrimaryButton>
          )}
        </div>
      </div>
    </article>
  );
}
