import styles from "./OfferCard.module.css";

export default function OfferCard({
  image,
  icon,
  title,

  description,

  button,

  link,
}) {
  return (
    <a href={link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.iconCircle}>{icon}</div>
      <div className={styles.content}>
        <h3>{title}</h3>

        <div className={styles.divider}></div>
        <p>{description}</p>

        <span>{button} →</span>
      </div>
    </a>
  );
}
