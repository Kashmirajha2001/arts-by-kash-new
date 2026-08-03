import { useContext } from "react";

import { ProductContext } from "../context/ProductContextValue";

export default function useProducts() {
  return useContext(ProductContext);
}
