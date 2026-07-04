import styles from "./GalleryCard.module.css";

export default function GalleryCard({ artwork, layout, onOpen }) {
  return (
    <article
      className={`${styles.card} ${styles[layout]}`}
      onClick={() => onOpen(artwork)}
    >
      <div className={styles.imageWrapper}>
        <img src={artwork.image} alt={artwork.title} className={styles.image} />

        <div className={styles.overlay}>
          <span>View Artwork →</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3>{artwork.title}</h3>

        <p>
          {artwork.medium} • {artwork.size} • {artwork.people}
        </p>
      </div>
    </article>
  );
}
