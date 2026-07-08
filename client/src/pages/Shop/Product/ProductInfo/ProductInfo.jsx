import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import IconButton from "@mui/material/IconButton";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../components/ui/SecondaryButton/SecondaryButton";
import { useStore } from "../../../../context/StoreContext";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const navigate = useNavigate();

  const wishlisted = isWishlisted(product.id);
  const { addToCart, isInCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const inCart = isInCart(product.id);

  const buttonText =
    product.type === "course"
      ? "Enroll Now"
      : inCart
        ? "🛒 Go to Cart"
        : "🛒 Add to Cart";

  return (
    <div className={styles.info}>
      <span className={styles.category}>Original Artwork</span>

      <h1>{product.title}</h1>

      <h2>₹{product.price.toLocaleString()}</h2>

      {product.stock > 0 ? (
        <>
          <div className={styles.quantity}>
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <RemoveRoundedIcon fontSize="small" />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => {
                if (quantity < product.stock) {
                  setQuantity((prev) => prev + 1);
                }
              }}
            >
              <AddRoundedIcon fontSize="small" />
            </button>
          </div>

          <div className={styles.buttons}>
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
                addToCart(product.id, quantity);
              }}
            >
              {buttonText}
            </PrimaryButton>

            <IconButton
              className={`${styles.wishlist} ${wishlisted ? styles.wishlisted : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
            >
              {wishlisted ? (
                <FavoriteRoundedIcon />
              ) : (
                <FavoriteBorderRoundedIcon />
              )}
            </IconButton>
          </div>

          <PrimaryButton variant="outlined">Buy Now</PrimaryButton>
        </>
      ) : (
        <PrimaryButton>Sold Out</PrimaryButton>
      )}

      <div className={styles.trust}>
        <div>
          🛡
          <span>Secure Packaging</span>
        </div>

        <div>
          🎨
          <span>Handmade Original</span>
        </div>

        <div>
          🚚
          <span>Fast Shipping</span>
        </div>
      </div>

      <div className={styles.details}>
        <h3>Artwork Details</h3>

        <ul>
          <li>
            <strong>Medium:</strong> {product.medium}
          </li>

          <li>
            <strong>Size:</strong> {product.size}
          </li>

          <li>
            <strong>Frame:</strong> {product.frame}
          </li>

          <li>
            <strong>Availability:</strong>{" "}
            {product.stock === 0
              ? "Sold Out"
              : product.stock === 1
                ? "Only 1 left"
                : `${product.stock} available`}
          </li>
        </ul>
      </div>

      <div className={styles.description}>
        <h3>About this Artwork</h3>

        <ul>
          {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
