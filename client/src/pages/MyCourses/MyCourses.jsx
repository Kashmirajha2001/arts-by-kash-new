import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import Loader from "../../components/ui/Loader/Loader";
import PrimaryButton from "../../components/ui/PrimaryButton/PrimaryButton";

import useCourse from "../../hooks/useCourse";
import MyCourseCard from "./components/MyCourseCard/MyCourseCard";

import styles from "./MyCourses.module.css";

export default function MyCourses() {
  const { ownedCourses, loading, getProgress } = useCourse();

  if (loading) return <Loader />;

  return (
    <main className={styles.page}>
      <PageHero
        title="My Courses"
        breadcrumb="Continue your creative learning journey"
        image={HeroImage}
      />

      <section className={styles.section}>
        {ownedCourses.length === 0 ? (
          <div className={styles.empty}>
            <h2>No courses unlocked yet.</h2>
            <p>
              Purchase a masterclass once and it will appear here with lifetime
              learning access.
            </p>
            <PrimaryButton to="/courses">Explore Courses</PrimaryButton>
          </div>
        ) : (
          <div className={styles.grid}>
            {ownedCourses.map((course) => (
              <MyCourseCard
                key={course.productId}
                course={course}
                progress={getProgress(course)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
