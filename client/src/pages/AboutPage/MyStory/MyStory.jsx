import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../animations/heroVariants";

import styles from "./MyStory.module.css";

import storyImage from "../../../assets/images/about/story.jpg";
import botanical from "../../../assets/textures/botanical.png";

import Container from "../../../components/ui/Container/Container";

export default function MyStory() {
  return (
    <Section>
      <Container>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.image}
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src={botanical} alt="" className={styles.botanical} />
            <img src={botanical} alt="" className={styles.botanicalRight} />
            <div className={styles.photoFrame}>
              <img src={storyImage} alt="Kash creating artwork" />
            </div>
            {/* <img src={storyImage} alt="Kash creating artwork" /> */}
            <p className={styles.caption}>
              Creating with patience, one pencil stroke at a time.
            </p>
          </motion.div>

          <motion.div
            className={styles.content}
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionSubTitle>My Story</SectionSubTitle>

            <SectionTitle>
              Every Portrait Begins With A Single Pencil Stroke
            </SectionTitle>

            <p>
              Art has always been more than just creating beautiful drawings—it
              has been my way of slowing down, observing the little details that
              often go unnoticed, and expressing emotions beyond words.
            </p>

            <p>
              Over the years, countless hours of practice, experimentation, and
              patience shaped not only my skills but also my love for teaching.
              Every commission, every sketch, and every finished portrait became
              another step in my artistic journey.
            </p>

            <p>
              Today, my goal is simple—to help aspiring artists learn realistic
              coloured pencil art with confidence through clear guidance,
              structured lessons, and an enjoyable creative experience.
            </p>

            <div className={styles.signature}>— Kashmira</div>
          </motion.div>
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              ✏️ <span>Portrait Artist</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.highlight}>
              🎨 <span>Art Educator</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.highlight}>
              📍 <span>Based in India</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
