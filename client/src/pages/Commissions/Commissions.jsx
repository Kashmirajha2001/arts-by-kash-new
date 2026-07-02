import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import Gallery from "./Gallery/Gallery";
import commissionImages from "./data/commissionImages";
import PricingCalculator from "./PricingCalculator/PricingCalculator";

// import FAQ from "./FAQ/FAQ";

export default function Commissions() {
  return (
    <>
      <PageHero
        title="Courses"
        breadcrumb="Learn. Create. Grow."
        image={HeroImage}
      />
      {/* <Gallery course={commissionImages[0]} /> */}
      <PricingCalculator/>
    </>
  );
}
