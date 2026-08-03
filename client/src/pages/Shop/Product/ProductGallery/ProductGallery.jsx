import { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import IconButton from "@mui/material/IconButton";
import { useStore } from "../../../../context/StoreContext";

import styles from "./ProductGallery.module.css";

export default function ProductGallery({ product }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { toggleWishlist, isWishlisted } = useStore();
  const images = product.images?.map((image) => image.url).filter(Boolean) || [];

  const wishlisted = isWishlisted(product.id);

  useEffect(() => {
    if (images.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={styles.gallery}>
      <div className={styles.imageWrapper}>
        <img src={images[currentImage]} alt={product.title} />

        <IconButton
          className={styles.wishlist}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          {wishlisted ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </IconButton>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`${styles.dot} ${
              currentImage === index ? styles.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
