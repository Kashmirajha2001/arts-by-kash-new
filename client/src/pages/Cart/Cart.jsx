import PageHero from "../../components/shared/PageHero/PageHero";

import HeroImage from "../../assets/images/hero/courses-hero.jpg";

import { useStore } from "../../context/StoreContext";

import shopData from "../Shop/data/shopData";

import CartItem from "./CartItem/CartItem";
import CartSummary from "./CartSummary/CartSummary";
import EmptyCart from "./EmptyCart/EmptyCart";

import styles from "./Cart.module.css";

export default function Cart() {
  const { cart } = useStore();

  const cartProducts = cart
    .map((item) => {
      const product = shopData.find((p) => p.id === item.productId);

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <PageHero
        title="Shopping Cart"
        breadcrumb="Your Art Collection"
        image={HeroImage}
      />

      <section className={styles.section}>
        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className={styles.header}>
              <h2>Shopping Cart</h2>
              <span>
                {cartProducts.length} item
                {cartProducts.length > 1 && "s"}
              </span>
            </div>

            <div className={styles.layout}>
              <div className={styles.items}>
                {cartProducts.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    compact={false}
                  />
                ))}
              </div>

              <CartSummary
                subtotal={subtotal}
                itemCount={cartProducts.length}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
