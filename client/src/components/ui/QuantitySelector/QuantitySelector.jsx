import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import styles from "./QuantitySelector.module.css";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className={styles.selector}>
      <button onClick={onDecrease}>
        <RemoveRoundedIcon />
      </button>

      <span>{quantity}</span>

      <button onClick={onIncrease}>
        <AddRoundedIcon />
      </button>
    </div>
  );
}
