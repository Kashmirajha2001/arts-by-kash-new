import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton/SecondaryButton";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import styles from "./AboutCTA.module.css";

export default function AboutCTA() {
  return (
    <Section>
      <motion.div
        className={styles.wrapper}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        <SectionSubTitle>Let's Create Together</SectionSubTitle>

        <SectionTitle>
          Ready To Begin Your Own Artistic Journey?
        </SectionTitle>

        <p className={styles.description}>
          Whether you're looking to master realistic coloured pencil portraits
          or preserve a cherished memory through a custom artwork, I'd love to
          create something meaningful with you.
        </p>

        <div className={styles.buttons}>
          <PrimaryButton to="/courses">
            Explore Courses
          </PrimaryButton>

          <SecondaryButton to="/contact">
            Book a Commission
          </SecondaryButton>
        </div>

        <div className={styles.quote}>
          <p>
            “Every masterpiece starts with a single pencil stroke.”
          </p>

          <span>— Kashmira</span>
        </div>
      </motion.div>
    </Section>
  );
}