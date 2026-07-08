import { useStore } from "../../../context/StoreContext";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./OrderSummary.module.css";

export default function OrderSummary() {
  const { cartProducts, subtotal, shipping, total } = useStore();

  return (
    <aside className={styles.summary}>
      <h2>Order Summary</h2>

      <div className={styles.products}>
        {cartProducts.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image[0]} alt={product.title} />

            <div className={styles.info}>
              <h4>{product.title}</h4>

              <span>
                ₹{product.price.toLocaleString()} × {product.quantity}
              </span>
            </div>

            <strong>
              ₹{(product.price * product.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

      <hr />

      <div className={styles.row}>
        <span>Subtotal</span>

        <strong>₹{subtotal.toLocaleString()}</strong>
      </div>

      <div className={styles.row}>
        <span>Shipping</span>

        <strong>
          {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
        </strong>
      </div>

      <div className={styles.total}>
        <span>Total</span>

        <strong>₹{total.toLocaleString()}</strong>
      </div>

      <div className={styles.secure}>🔒 Secure payment powered by Razorpay</div>

      <PrimaryButton>Proceed to Payment</PrimaryButton>
    </aside>
  );
}
