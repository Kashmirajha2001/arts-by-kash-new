import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import { LuBadgeCheck, LuCircleOff } from "react-icons/lu";

import styles from "./WhoIsThisFor.module.css";

export default function WhoIsThisFor({ course }) {
  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Who This Course Is For</SectionSubTitle>

        <SectionTitle>Is This Masterclass Right for You?</SectionTitle>

        <p className={styles.description}>
          Whether you're picking up coloured pencils for the first time or
          refining your portrait skills, this course is designed to help you
          progress with confidence.
        </p>
      </div>

      <div className={styles.wrapper}>
        {/* Perfect For */}

        <motion.div
          className={styles.column}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>✨ Perfect For</h3>

          {course.perfectFor.map((item, index) => (
            <div key={index} className={styles.item}>
              <LuBadgeCheck className={`${styles.icon} ${styles.good}`} />

              <p className={styles.text}>{item}</p>
            </div>
          ))}
        </motion.div>

        {/* May Not Be For You */}

        <motion.div
          className={styles.column}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <h3>🌿May Not Be For You</h3>

          {course.notFor.map((item, index) => (
            <div key={index} className={styles.item}>
              <LuCircleOff className={`${styles.icon} ${styles.bad}`} />

              <p className={styles.text}>{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
