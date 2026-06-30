import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import CourseCard from "./CourseCard/CourseCard";
import Preview from "./Preview/Preview";
import WhatYouWillLearn from "./WhatYouWillLearn/WhatYouWillLearn";
import Curriculum from "./Curriculum/Curriculum";
import WhoIsThisFor from "./WhoIsThisFor/WhoIsThisFor";
import ArtworksYoullCreate from "./ArtworksYou'llCreate/ArtworksYou'llCreate";
import FAQ from "./FAQ/FAQ";
import FinalCTA from "./FinalCTA/FinalCTA";

import courses from "./data/courses";

export default function Courses() {
  return (
    <>
      <PageHero
        title="Courses"
        breadcrumb="Learn. Create. Grow."
        image={HeroImage}
      />

      {/* <SectionTitle>Portrait Masterclass </SectionTitle> */}
      <CourseCard course={courses[0]} />
      <Preview course={courses[0]} />
      <WhatYouWillLearn course={courses[0]} />
      {/* <Curriculum course={courses[0]} /> */}
      <Curriculum course={courses[0]} hasAccess={false} completedLessons={[]} />
      <WhoIsThisFor course={courses[0]} />
      <ArtworksYoullCreate course={courses[0]} />
      <FAQ/>
      <FinalCTA/>
    </>
  );
}
