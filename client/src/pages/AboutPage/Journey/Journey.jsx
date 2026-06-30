import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../animations/heroVariants";

import botanical from "../../../assets/textures/botanical.png";

import styles from "./Journey.module.css";

export default function Journey({ journey }) {
  const pairs = [];
  for (let i = 0; i < journey.length - 1; i += 2) {
    pairs.push([journey[i], journey[i + 1]]);
  }
  const lastItem =
    journey.length % 2 !== 0 ? journey[journey.length - 1] : null;

  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>My Journey</SectionSubTitle>
        <SectionTitle>Every Artist Has A Story Worth Sharing</SectionTitle>
        <p className={styles.description}>
          From my very first sketch to teaching aspiring artists today, every
          milestone has shaped the artist I continue to become.
        </p>
      </div>

      <div className={styles.timelineWrapper}>
        {/* Vertical center line */}
        <div className={styles.centerLine} />

        <div className={styles.timeline}>
          {pairs.map(([left, right], rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {/* Left card */}
              <motion.div
                className={`${styles.item} ${styles.itemLeft}`}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: rowIndex * 0.08 }}
              >
                <div className={styles.card}>
                  <img src={botanical} alt="" className={styles.botanical} />
                  <span className={styles.year}>{left.year}</span>
                  <div className={styles.cardHeader}>
                    <div className={styles.icon}>{left.icon}</div>
                    <h3>{left.title}</h3>
                  </div>
                  <p>{left.description}</p>
                </div>
                {/* Connector line + dot on the right edge */}
                <div className={styles.connectorRight}>
                  <span className={styles.dot} />
                </div>
              </motion.div>

              {/* Right card */}
              <motion.div
                className={`${styles.item} ${styles.itemRight}`}
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: rowIndex * 0.08 + 0.06 }}
              >
                {/* Connector line + dot on the left edge */}
                <div className={styles.connectorLeft}>
                  <span className={styles.dot} />
                </div>
                <div className={styles.card}>
                  <img src={botanical} alt="" className={styles.botanical} />
                  <span className={styles.year}>{right.year}</span>
                  <div className={styles.cardHeader}>
                    <div className={styles.icon}>{right.icon}</div>
                    <h3>{right.title}</h3>
                  </div>
                  <p>{right.description}</p>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Last item centered */}
          {lastItem && (
            <div className={styles.lastRow}>
              {/* Vertical connector drop from center line */}
              <div className={styles.connectorDown}>
                <span className={styles.dot} />
              </div>
              <motion.div
                className={styles.lastItem}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.card}>
                  <img src={botanical} alt="" className={styles.botanical} />
                  <span className={styles.year}>{lastItem.year}</span>
                  <div className={styles.cardHeader}>
                    <div className={styles.icon}>{lastItem.icon}</div>
                    <h3>{lastItem.title}</h3>
                  </div>
                  <p>{lastItem.description}</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
