import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton/SecondaryButton";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";
import botanical from "../../../assets/textures/botanical.png";

import {
  LuBookOpen,
  LuInfinity,
  LuSmartphone,
  LuMessageCircle,
} from "react-icons/lu";

import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <Section>
      <motion.div
        className={styles.wrapper}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={styles.texture}></div>
        <img src={botanical} alt="" className={styles.botanical} />
        <SectionTitle>Ready to Start Your Artistic Journey?</SectionTitle>

        <p className={styles.description}>
          Join hundreds of aspiring artists and learn realistic coloured pencil
          portraits with a structured, beginner-friendly approach.
        </p>

        <div className={styles.features}>
          <div>
            <LuBookOpen />
            <span>20+ Lessons</span>
          </div>

          <div>
            <LuInfinity />
            <span>Lifetime Access</span>
          </div>

          <div>
            <LuSmartphone />
            <span>Learn Anywhere</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <PrimaryButton>Enrol Now</PrimaryButton>
        </div>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.help}>
          <h3>Still have questions?</h3>

          <p>
            I'd be happy to help you decide whether this course is the right fit
            for you.
          </p>

          <SecondaryButton to="/contact">
            <LuMessageCircle />
            Contact Me
          </SecondaryButton>
        </div>
      </motion.div>
    </Section>
  );
}
