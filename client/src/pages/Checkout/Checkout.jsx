import PageHero from "../../components/shared/PageHero/PageHero";

import HeroImage from "../../assets/images/hero/courses-hero.jpg";

import ShippingForm from "./ShippingForm/ShippingForm";
import OrderSummary from "./OrderSummary/OrderSummary";
import CheckoutProvider from "../../context/CheckoutContext";

import styles from "./Checkout.module.css";

export default function Checkout() {
  return (
    <>
      <PageHero
        title="Checkout"
        breadcrumb="Secure Payment"
        image={HeroImage}
      />

      <CheckoutProvider>
        <section className={styles.section}>
          <div className={styles.layout}>
            <ShippingForm />

            <OrderSummary />
          </div>
        </section>
      </CheckoutProvider>
    </>
  );
}
