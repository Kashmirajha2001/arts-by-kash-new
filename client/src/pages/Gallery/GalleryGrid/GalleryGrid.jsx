import Masonry from "react-masonry-css";

import GalleryCard from "../GalleryCard/GalleryCard";

import styles from "./GalleryGrid.module.css";

const breakpointColumns = {
  default: 5,
  1400: 4,
  992: 3,
  768: 2,
  // 480: 1,
};

export default function GalleryGrid({ artworks, onOpen }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles.grid}
      columnClassName={styles.column}
    >
      {artworks.map((artwork) => (
        <GalleryCard key={artwork.id} artwork={artwork} onOpen={onOpen} />
      ))}
    </Masonry>
  );
}
