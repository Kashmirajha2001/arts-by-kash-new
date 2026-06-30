import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import { LuLayers3, LuSparkles } from "react-icons/lu";

import styles from "./ArtworksYou'llCreate.module.css";

export default function ArtworksYoullCreate({ course }) {
  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Artworks You'll Create</SectionSubTitle>

        <SectionTitle>Build a Portfolio You'll Be Proud Of</SectionTitle>

        <p className={styles.description}>
          Every project introduces new techniques while helping you create
          beautiful finished artworks from start to finish.
        </p>
      </div>

      <div className={styles.slider}>
        {course?.artworks?.length > 0 &&
          course.artworks.map((project, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} />

                <span className={styles.level}>{project.level}</span>
              </div>

              <div className={styles.content}>
                <h3>{project.title}</h3>

                <p>{project.subtitle}</p>

                <div className={styles.meta}>
                  <span>
                    <LuLayers3 />
                    {project.lessons} Lessons
                  </span>

                  {/* <span>
                    <LuSparkles />
                    Final Artwork
                  </span> */}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </Section>
  );
}
