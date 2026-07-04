import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <span className={styles.badge}>Let's Create Something Beautiful</span>

        <h2>Still Have Questions?</h2>

        <p>
          Not sure which artwork is right for you? I'd be happy to discuss your
          ideas, recommend the perfect size or medium, and answer any questions
          before you place your commission.
        </p>

        <PrimaryButton
          onClick={() =>
            window.open(
              "https://wa.me/918420333594?text=Hi%20Kash,%20I'd%20like%20to%20discuss%20a%20commission.",
              "_blank",
            )
          }
        >
          Contact Me
        </PrimaryButton>
      </div>
    </section>
  );
}
