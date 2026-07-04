import { useEffect, useRef, useState } from "react";

import styles from "./GalleryTabs.module.css";

const categories = [
  "All",
  "Graphite",
  "Colour Pencil",
  "Acrylic",
  "Pets",
  "Jackets",
];

export default function GalleryTabs({ activeCategory, setActiveCategory }) {
  const tabsRef = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const activeIndex = categories.findIndex(
      (category) => category === activeCategory,
    );

    const activeTab = tabsRef.current[activeIndex];

    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory]);

  return (
    <nav className={styles.tabs}>
      {categories.map((category, index) => (
        <button
          key={category}
          ref={(el) => (tabsRef.current[index] = el)}
          type="button"
          onClick={() => setActiveCategory(category)}
          className={`${styles.tab} ${
            activeCategory === category ? styles.active : ""
          }`}
        >
          {category}
        </button>
      ))}

      <span
        className={styles.indicator}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </nav>
  );
}
