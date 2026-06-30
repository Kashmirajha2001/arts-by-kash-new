import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import MyStory from "./MyStory/MyStory";
import Journey from "./Journey/Journey";
import journey from "./data/journey";
import Workspace from "./Workspace/Workspace";
import studio from "./data/studio";
import AboutCTA from "./AboutCTA/AboutCTA";

export default function About() {
  return (
    <>
      <PageHero
        title="About"
        breadcrumb="Person behind this page"
        image={HeroImage}
      />

      <MyStory/>
      <Journey journey={journey}/>
      <Workspace studio={studio}/>
      <AboutCTA/>
    </>
  );
}
