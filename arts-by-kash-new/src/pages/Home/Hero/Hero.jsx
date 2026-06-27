import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import HeroImage from "../../../assets/images/placeholders/hero-portrait1.png";
// import Botanical from "../../assets/textures/botanical.png";
import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Section>
      <div className={styles.hero}>
        <div className={styles.left}>
          {/* <div className={styles.badge}>🎨 Mixed Media Artist</div> */}
          <motion.div
            className={styles.badge}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            🎨 Mixed Media Artist
          </motion.div>

          <motion.h1
            className={styles.title}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            Where
            <br />
            Every <span className={styles.script}>Stroke</span>
            <br />
            Tells a Story.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            Learn realistic portraits, discover new techniques, and create
            artwork you'll be proud of.
          </motion.p>

          <motion.div
            className={styles.buttons}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            <PrimaryButton>Explore Courses</PrimaryButton>
            <PrimaryButton variant="outline">Book Commission</PrimaryButton>
          </motion.div>
        </div>

        <div className={styles.right}>
          {/* <div className={styles.splash}></div>
            <img className={styles.botanical} src={Botanical} alt="" /> */}
          <img className={styles.heroImage} src={HeroImage} alt="Portrait" />
          {/* <motion.img
            className={styles.heroImage}
            src={HeroImage}
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            alt="Portrait"
          /> */}
        </div>
      </div>
    </Section>
  );
}
