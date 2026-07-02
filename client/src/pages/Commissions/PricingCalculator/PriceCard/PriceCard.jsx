import { useEffect, useState } from "react";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import pricing from "../../data/pricingData";
import styles from "./PriceCard.module.css";
import Palette from "@mui/icons-material/Palette";
import Straighten from "@mui/icons-material/Straighten";
import Group from "@mui/icons-material/Group";

export default function PriceCard({ medium, size, people, price, onBook }) {
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
            alt={pricing[medium].title}
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
          🎨 <span>{pricing[medium].title}</span>
        </div>

        <div>
          🖍️<span>{size}</span>
        </div>

        <div>
          👥{" "}
          <span>
            {people === 1
              ? "Single"
              : people === 2
                ? "Couple"
                : `${people} People`}
          </span>
        </div>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.priceSection}>
        <small className={styles.label}>Estimated Price</small>

        {price === null ? (
          <>
            <h2>Custom Quote</h2>

            <p>
              Acrylic paintings are priced according to the canvas size and
              artwork complexity.
            </p>
          </>
        ) : (
          <>
            <h2>₹{price.toLocaleString("en-IN")}</h2>

            <p>Shipping & framing charges are calculated separately.</p>
          </>
        )}
      </div>

      {/* <div className={styles.features}>
        <div>✓ Handmade Artwork</div>

        <div>✓ Premium Materials</div>

        <div>✓ Secure Packaging</div>

        <div>✕ Frame Not Included</div>
      </div> */}
      <div className={styles.bookButton}>
        <PrimaryButton onClick={onBook}>Book This Commission</PrimaryButton>
      </div>
    </div>
  );
}
