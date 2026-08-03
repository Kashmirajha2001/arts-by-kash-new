import styles from "./Notes.module.css";

export default function Notes() {
  return (
    <section className={styles.card}>
      <h3>Private Notes</h3>
      <textarea
        className={styles.textarea}
        placeholder="Write your personal lesson notes here..."
      />
    </section>
  );
}
