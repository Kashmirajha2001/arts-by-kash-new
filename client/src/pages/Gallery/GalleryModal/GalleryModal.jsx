import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./GalleryModal.module.css";

export default function GalleryModal({ artwork, artworks, onClose, onBook }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!artwork) return;

    const index = artworks.findIndex((item) => item.id === artwork.id);

    setCurrentIndex(index);
  }, [artwork, artworks]);

  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === artworks.length - 1 ? 0 : prev + 1,
        );
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? artworks.length - 1 : prev - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artwork, artworks, onClose]);

  if (!artwork) return null;

  const currentArtwork = artworks[currentIndex];

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>

        <button className={`${styles.arrow} ${styles.left}`} onClick={previous}>
          <ChevronLeftIcon />
        </button>

        <button className={`${styles.arrow} ${styles.right}`} onClick={next}>
          <ChevronRightIcon />
        </button>

        <div className={styles.imageSection}>
          <img src={currentArtwork.image} alt={currentArtwork.title} />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.medium}>{currentArtwork.medium}</span>

          <h2>{currentArtwork.title}</h2>

          <p className={styles.meta}>
            {currentArtwork.size}
            {currentArtwork.people && ` • ${currentArtwork.people}`}
          </p>

          {currentArtwork.description && (
            <p className={styles.description}>{currentArtwork.description}</p>
          )}

          <PrimaryButton onClick={onBook}>
            Commission Similar Artwork
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
