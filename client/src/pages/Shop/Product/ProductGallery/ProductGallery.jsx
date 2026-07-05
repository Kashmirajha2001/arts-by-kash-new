import { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IconButton from "@mui/material/IconButton";

import styles from "./ProductGallery.module.css";

export default function ProductGallery({ product }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.image.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [product]);

  return (
    <div className={styles.gallery}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image[currentImage]}
          alt={product.title}
        />

        <IconButton className={styles.wishlist}>
          <FavoriteBorderRoundedIcon />
        </IconButton>
      </div>

      <div className={styles.dots}>
        {product.image.map((_, index) => (
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