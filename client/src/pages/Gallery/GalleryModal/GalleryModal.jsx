import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import styles from "./GalleryModal.module.css";

export default function GalleryModal({ artwork, artworks, onClose, onBook }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!artwork) return;
    const index = artworks.findIndex((item) => item.id === artwork.id);
    setCurrentIndex(index);
  }, [artwork, artworks]);

  useEffect(() => {
    if (!artwork) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "ArrowRight") {
        next();
      }
      if (e.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, currentIndex]);

  // body scroll lock — cleanup always runs on unmount
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [artwork]);

  if (!artwork) return null;

  const currentArtwork = artworks[currentIndex];

  const previous = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  const imageVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <motion.button
          className={styles.closeBtn}
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <CloseIcon />
        </motion.button>

        {/* Prev */}
        <motion.button
          className={`${styles.arrow} ${styles.left}`}
          onClick={previous}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.18 }}
        >
          <ChevronLeftIcon />
        </motion.button>

        {/* Next */}
        <motion.button
          className={`${styles.arrow} ${styles.right}`}
          onClick={next}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.18 }}
        >
          <ChevronRightIcon />
        </motion.button>

        <div className={styles.imageSection}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentArtwork.id}
              src={currentArtwork.image}
              alt={currentArtwork.title}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
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
          <PrimaryButton to="/commissions">
            Commission Similar Artwork
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
