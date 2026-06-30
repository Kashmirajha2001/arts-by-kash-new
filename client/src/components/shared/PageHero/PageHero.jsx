import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";
import styles from "./PageHero.module.css";

export default function PageHero({ title, breadcrumb, image }) {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(45,30,20,.45),
            rgba(45,30,20,.45)
          ),
          url(${image})
        `,
      }}
    >
      <motion.div
        className={styles.content}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1>{title}</h1>

        <div>{breadcrumb}</div>
      </motion.div>
    </section>
  );
}
