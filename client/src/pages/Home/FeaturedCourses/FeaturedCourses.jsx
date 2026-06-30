import Section from "../../../components/ui/Section/Section";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/heroVariants";

import {
  LuBookOpen,
  LuGraduationCap,
  LuDownload,
  LuPalette,
} from "react-icons/lu";

import CourseImage from "../../../assets/images/course/course-preview.jpg";

import styles from "./FeaturedCourses.module.css";

export default function FeaturedCourse() {
  return (
    <Section>
      <div className={styles.outer}>
        <SectionSubTitle>Featured Masterclass</SectionSubTitle>
        <div className={styles.course}>
          {/* LEFT */}

          <motion.div
            className={styles.left}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className={styles.heading}>
              Learn the Art of
              <br />
              <span>Realistic Colour Pencil Portraits</span>
            </h2>

            <p className={styles.description}>
              Build confidence from your very first sketch through structured
              lessons, practical exercises and realistic portrait techniques.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <LuGraduationCap />
                Beginner Friendly
              </div>

              <div className={styles.feature}>
                <LuBookOpen />
                20+ Lessons
              </div>

              <div className={styles.feature}>
                <LuDownload />
                PDF Resources
              </div>

              <div className={styles.feature}>
                <LuPalette />
                Real Projects
              </div>
            </div>

            <PrimaryButton to="/courses">Coming soon....</PrimaryButton>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            className={styles.right}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.imageCard}>
              <img src={CourseImage} alt="Course Preview" />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
