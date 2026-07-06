import { Link } from "react-router-dom";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

import styles from "./ProductBreadcrumb.module.css";

export default function ProductBreadcrumb({ product }) {
  return (
    <nav className={styles.breadcrumb}>
      <Link to="/">Home</Link>

      <NavigateNextRoundedIcon />

      <Link to="/shop">Shop</Link>

      <NavigateNextRoundedIcon />

      <span>
        {product.type === "artwork" ? "Original Artwork" : "Fine Art Print"}
      </span>

      <NavigateNextRoundedIcon />

      <strong>{product.title}</strong>
    </nav>
  );
}
