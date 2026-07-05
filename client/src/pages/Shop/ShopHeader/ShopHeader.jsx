import styles from "./ShopHeader.module.css";

export default function ShopHeader() {
  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <div>
          <h2>Browse the Collection</h2>

          <p>
            Discover original artworks, premium prints and carefully crafted art
            courses.
          </p>
        </div>

        {/* Search & Sort coming next */}
      </div>
    </section>
  );
}
