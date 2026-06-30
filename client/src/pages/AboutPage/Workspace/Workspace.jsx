import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import styles from "./Workspace.module.css";

export default function Workspace({ studio }) {
  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Behind The Studio</SectionSubTitle>

        <SectionTitle>
          Where Every Portrait Comes To Life
        </SectionTitle>

        <p className={styles.description}>
          A glimpse into the little corner where sketches become finished
          portraits—filled with coloured pencils, favourite tools, peaceful
          mornings, and countless hours of practice.
        </p>
      </div>

      <div className={styles.grid}>
        {studio.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.card} ${styles[`card${index + 1}`]}`}
            variants={fadeUp}
            custom={index * 0.12}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} />

              <div className={styles.overlay}>
                <div className={styles.content}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}