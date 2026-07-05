import shopData from "../data/shopData";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductGrid.module.css";

export default function ProductGrid({ activeCategory }) {
  const filteredProducts =
    activeCategory === "all"
      ? shopData
      : shopData.filter((product) => product.type === activeCategory);

  return (
    <section className={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
