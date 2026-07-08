import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import QuantitySelector from "../../../components/ui/QuantitySelector/QuantitySelector";

import { useStore } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";

import styles from "./CartItem.module.css";

export default function CartItem({ product, compact = true }) {
  const { updateCartQuantity, removeFromCart, closeCart } = useStore();

  const navigate = useNavigate();

  const handleProductClick = () => {
    closeCart(); // Optional: close drawer before navigating
    navigate(`/shop/${product.id}`);
  };

  return (
    <div
      className={`${styles.item} ${!compact ? styles.full : ""}`}
      onClick={handleProductClick}
    >
      <img src={product.image[0]} alt={product.title} />

      <div className={styles.info}>
        <h4>{product.title}</h4>
        <span>₹{product.price.toLocaleString()}</span>
        <p className={styles.subtotal}>
          <span>Subtotal:</span> ₹{(product.price * product.quantity).toLocaleString()}
        </p>

        {/* desktop: quantity inside info */}
        <div
          className={styles.desktopControls}
          onClick={(e) => e.stopPropagation()}
        >
          <QuantitySelector
            quantity={product.quantity}
            onIncrease={() => {
              if (product.quantity < product.stock) {
                updateCartQuantity(product.id, product.quantity + 1);
              }
            }}
            onDecrease={() =>
              product.quantity > 1
                ? updateCartQuantity(product.id, product.quantity - 1)
                : removeFromCart(product.id)
            }
            disableIncrease={product.quantity >= product.stock}
            disableDecrease={product.quantity <= 1}
          />
        </div>
      </div>

      {/* desktop: delete floats top-right */}
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          removeFromCart(product.id);
        }}
      >
        <DeleteOutlineRoundedIcon />
      </button>

      {/* mobile only: quantity + delete in one bottom row */}
      <div
        className={styles.mobileControls}
        onClick={(e) => e.stopPropagation()}
      >
        <QuantitySelector
          quantity={product.quantity}
          onIncrease={() => {
            if (product.quantity < product.stock) {
              updateCartQuantity(product.id, product.quantity + 1);
            }
          }}
          onDecrease={() =>
            product.quantity > 1
              ? updateCartQuantity(product.id, product.quantity - 1)
              : removeFromCart(product.id)
          }
          disableIncrease={product.quantity >= product.stock}
          disableDecrease={product.quantity <= 1}
        />
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart(product.id);
          }}
        >
          <DeleteOutlineRoundedIcon />
        </button>
      </div>
    </div>
  );
}
