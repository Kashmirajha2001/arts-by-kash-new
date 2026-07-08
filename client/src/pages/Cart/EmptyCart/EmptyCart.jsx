import { FiShoppingCart } from "react-icons/fi";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.empty}>
      <FiShoppingCart />

      <h2>Your cart is empty</h2>

      <p>Looks like you haven't added any artworks yet.</p>

      <PrimaryButton to="/shop">Browse Collection</PrimaryButton>
    </div>
  );
}
