import Hero from "./Hero/Hero";
import About from "./About/About";
import WhatIOffer from './WhatIOffer/WhatIOffer';
import styles from "./Home.module.css";
import FeaturedCourses from "./FeaturedCourses/FeaturedCourses";
// import FeaturedGallery from "./FeaturedGallery/FeaturedGallery";
// import Testimonials from "./Testimonials/Testimonials";
// import FAQ from "./FAQ/FAQ";
// import StudentShowcase from "./StudentShowcase/StudentShowcase";

export default function Home() {
  return (
    <main className={styles.home}>
      <Hero />
      <About />
      <WhatIOffer/>
      <FeaturedCourses />
      {/* <FeaturedGallery /> */}
      {/* <Testimonials /> */}
      {/* <StudentShowcase /> */}
      {/* <FAQ /> */}
    </main>
  );
}
