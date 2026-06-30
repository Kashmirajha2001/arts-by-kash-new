import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuChevronDown,
  LuLock,
  LuPlay,
  LuCheck,
  LuBookOpen,
  LuClock3,
} from "react-icons/lu";

import Section from "../../../components/ui/Section/Section";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import styles from "./Curriculum.module.css";

export default function Curriculum({
  course,
  hasAccess = false,
  completedLessons = [],
}) {
  const [openModule, setOpenModule] = useState(0);
  //   const completed = completedLessons.includes(lesson.id);

  const handleLessonClick = (lesson) => {
    if (!hasAccess) {
      console.log("Redirect to Checkout");
      // navigate(`/learn/${course.slug}/${lesson.videoId}`);

      return;
    }

    console.log("Open lesson:", lesson.videoId);
  };

  const getModuleDuration = (lessons) => {
    const totalSeconds = lessons.reduce((total, lesson) => {
      if (!lesson.duration) return total;

      const [minutes = 0, seconds = 0] = lesson.duration.split(":").map(Number);

      return total + minutes * 60 + seconds;
    }, 0);

    const totalMinutes = Math.floor(totalSeconds / 60);

    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return `${hours}h ${mins}m`;
  };

  return (
    <Section>
      <div className={styles.heading}>
        <SectionSubTitle>Course Curriculum</SectionSubTitle>

        <SectionTitle>Everything You'll Learn Step by Step</SectionTitle>
      </div>

      <div className={styles.list}>
        {course.curriculum.map((module, index) => (
          <div className={styles.module} key={index}>
            <button
              className={styles.header}
              onClick={() => setOpenModule(openModule === index ? null : index)}
            >
              <div className={styles.left}>
                <div className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <span className={styles.moduleLabel}>Module {index + 1}</span>

                  <h3>{module.title}</h3>
                </div>
              </div>

              <div className={styles.right}>
                {/* <span>{module.lessons.length} Lessons</span> */}
                <div className={styles.meta}>
                  <span>
                    <LuBookOpen />
                    {module.lessons.length} Lessons
                  </span>

                  <span>
                    <LuClock3 />
                    {getModuleDuration(module.lessons)}
                  </span>
                </div>

                <motion.div
                  animate={{
                    rotate: openModule === index ? 180 : 0,
                  }}
                >
                  <LuChevronDown />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {openModule === index && (
                <motion.div
                  className={styles.content}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {module.lessons.map((lesson, i) => {
                    const completed = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`${styles.lesson} ${
                          completed ? styles.completedLesson : ""
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className={styles.lessonLeft}>
                          {!hasAccess ? (
                            <LuLock
                              className={`${styles.lessonIcon} ${styles.locked}`}
                            />
                          ) : completed ? (
                            <LuCheck
                              className={`${styles.lessonIcon} ${styles.completed}`}
                            />
                          ) : (
                            <LuPlay
                              className={`${styles.lessonIcon} ${styles.available}`}
                            />
                          )}

                          <span className={styles.lessonNumber}>
                            Lesson {i + 1}
                          </span>

                          <span className={styles.lessonTitle}>
                            {lesson.title}
                          </span>
                        </div>

                        <span className={styles.duration}>
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
