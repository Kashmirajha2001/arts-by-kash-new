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

  switch (sort) {
    case "low-high":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "high-low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "name":
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;

    default:
      break;
  }

  return (
    <section className={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
