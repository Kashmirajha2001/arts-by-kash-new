import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../components/ui/SecondaryButton/SecondaryButton";

import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product }) {
  return (
    <div className={styles.info}>
      <span className={styles.category}>Original Artwork</span>

      <h1>{product.title}</h1>

      <h2>₹{product.price.toLocaleString()}</h2>

      <div className={styles.quantity}>
        <button>
          <RemoveRoundedIcon fontSize="small" />
        </button>

        <span>1</span>

        <button>
          <AddRoundedIcon fontSize="small" />
        </button>
      </div>

      <div className={styles.buttons}>
        <PrimaryButton>Add to Cart</PrimaryButton>

        <SecondaryButton>Wishlist</SecondaryButton>
      </div>

      <PrimaryButton>Buy Now</PrimaryButton>

      <div className={styles.details}>
        <h3>Artwork Details</h3>

        <ul>
          <li>
            <strong>Medium:</strong> {product.medium}
          </li>

          <li>
            <strong>Size:</strong> {product.size}
          </li>

          <li>
            <strong>Frame:</strong> {product.frame}
          </li>

          <li>
            <strong>Availability:</strong> {product.availability}
          </li>
        </ul>
      </div>

      <div className={styles.description}>
        <h3>About this Artwork</h3>

        <ul>
          {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
