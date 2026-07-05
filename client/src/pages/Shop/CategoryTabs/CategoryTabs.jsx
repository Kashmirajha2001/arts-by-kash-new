import categories from "../data/categories";

import styles from "./CategoryTabs.module.css";

export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.tab} ${
              activeCategory === category.id ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}
