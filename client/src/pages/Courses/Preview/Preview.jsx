import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";
import { FaPlay } from "react-icons/fa";
import { useRef, useState } from "react";

import styles from "./Preview.module.css";

export default function Preview({ course }) {
  const introRef = useRef(null);
  const previewRef = useRef(null);

  const [introPlaying, setIntroPlaying] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  return (
    <Section>
      <div className={styles.previewSection}>
        <Container>
          <SectionSubTitle>Before You Begin</SectionSubTitle>

          <SectionTitle>Get to Know Your Course</SectionTitle>

          <div className={styles.grid}>
            {/* Instructor */}

            <motion.div
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={styles.videoWrapper}>
                <video
                  ref={introRef}
                  controls={introPlaying}
                  poster={course.introPoster}
                  preload="metadata"
                  onPause={() => setIntroPlaying(false)}
                >
                  <source src={course.introVideo} type="video/mp4" />
                </video>

                {!introPlaying && (
                  <button
                    className={styles.playButton}
                    onClick={() => {
                      setIntroPlaying(true);
                      introRef.current.play();
                    }}
                  >
                    <FaPlay />
                  </button>
                )}
              </div>

              <div className={styles.content}>
                <h3>{course.introTitle}</h3>

                <p>{course.introDescription}</p>

                <div className={styles.watchLabel}>▶ Watch Introduction</div>
              </div>
            </motion.div>

            {/* Preview */}

            <motion.div
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className={styles.videoWrapper}>
                <video
                  ref={previewRef}
                  controls={previewPlaying}
                  poster={course.previewPoster}
                  preload="metadata"
                  onPause={() => setPreviewPlaying(false)}
                >
                  <source src={course.previewVideo} type="video/mp4" />
                </video>

                {!previewPlaying && (
                  <button
                    className={styles.playButton}
                    onClick={() => {
                      setPreviewPlaying(true);
                      previewRef.current.play();
                    }}
                  >
                    <FaPlay />
                  </button>
                )}
              </div>

              <div className={styles.content}>
                <h3>{course.previewTitle}</h3>

                <p>{course.previewDescription}</p>

                <div className={styles.watchLabel}>🎨 Watch Course Preview</div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
