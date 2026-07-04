import { useEffect, useState } from "react";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import more from "../data/more";
import styles from "./More.module.css";

export default function More({ medium, size, people, price, onBook }) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = pricing[medium].previewImages;

  useEffect(() => {
    setCurrentImage(0);
  }, [medium]);

  useEffect(() => {
    if (!images?.length) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === images.length - 1) return 0;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [medium]);

  return (
    <div className={styles.priceCard}>
      <div className={styles.imageContainer}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={more[medium].title}
            className={`${styles.previewImage} ${
              currentImage === index ? styles.activeImage : ""
            }`}
          />
        ))}

        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`${styles.dot} ${
                currentImage === index ? styles.activeDot : ""
              }`}
              aria-label={`Preview ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.selectionInfo}>
        <div>
          🎨 <span>{more[medium].title}</span>
        </div>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.bookButton}>
        <PrimaryButton onClick={onBook}>Book This Commission</PrimaryButton>
      </div>
    </div>
  );
}
