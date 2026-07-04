import PageHero from "../../components/shared/PageHero/PageHero";
import HeroImage from "../../assets/images/hero/courses-hero.jpg";
import Gallery from "./Gallery/Gallery";
import commissionImages from "./data/commissionImages";
import featureData from "./data/featureData";
import PricingCalculator from "./PricingCalculator/PricingCalculator";
import FeatureCards from "./FeatureCards/FeatureCards";
import { useState } from "react";
import More from "./More/More";
import CommissionModal from "./PricingCalculator/CommissionModal/CommissionModal";

// import FAQ from "./FAQ/FAQ";

export default function Commissions() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <PageHero
        title="Commissions"
        breadcrumb="Get your own Customized Portrait"
        image={HeroImage}
      />
      {/* <Gallery course={commissionImages[0]} /> */}
      <PricingCalculator />
      <More onBook={() => setIsModalOpen(true)}/>
      <CommissionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showSelection={false}
      />
      <FeatureCards />
    </>
  );
}
