import { useCallback, useEffect, useMemo, useState } from "react";

import { getProducts } from "../services/productService";
import { ProductContext } from "./ProductContextValue";

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadProducts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getProducts();

      setProducts(data || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reloadProducts();
  }, [reloadProducts]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      featuredProducts,
      loading,
      reloadProducts,
    }),
    [products, featuredProducts, loading, reloadProducts],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
