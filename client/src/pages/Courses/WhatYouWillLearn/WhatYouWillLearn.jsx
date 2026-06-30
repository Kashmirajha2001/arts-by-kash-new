import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { LuBadgeCheck } from "react-icons/lu";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import styles from "./WhatYouWillLearn.module.css";

export default function WhatYouWillLearn({ course }) {
  return (
    <Section>
      <div className={styles.wrapper}>
        <SectionSubTitle>By the End of This Course</SectionSubTitle>
        
        <div className={styles.heading}>
          <SectionTitle>You'll Be Able To...</SectionTitle>
        </div>

        <p className={styles.description}>
          confidently create realistic
          coloured pencil portraits using professional techniques and a
          structured workflow.
        </p>

        <div className={styles.grid}>
          {course.learningOutcomes.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                className={styles.item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className={styles.icon}>
                  <Icon />
                </div>

                <h3>{item.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
