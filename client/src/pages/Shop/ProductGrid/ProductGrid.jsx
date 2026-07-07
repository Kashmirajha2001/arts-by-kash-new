import shopData from "../data/shopData";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductGrid.module.css";

export default function ProductGrid({ activeCategory, search, sort }) {
  let filteredProducts =
    activeCategory === "all"
      ? shopData
      : shopData.filter((product) => product.type === activeCategory);

  if (search.trim()) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const sortFunction = (a, b) => {
    switch (sort) {
      case "low-high":
        return a.price - b.price;

      case "high-low":
        return b.price - a.price;

      case "name":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  };

  filteredProducts.sort((a, b) => {
    // 1. Featured products always first
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    // 2. Sold out products always last
    const aSoldOut = a.stock === 0;
    const bSoldOut = b.stock === 0;

    if (aSoldOut !== bSoldOut) {
      return aSoldOut ? 1 : -1;
    }

    // 3. Apply selected sorting
    return sortFunction(a, b);
  });

  return (
    <section className={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
