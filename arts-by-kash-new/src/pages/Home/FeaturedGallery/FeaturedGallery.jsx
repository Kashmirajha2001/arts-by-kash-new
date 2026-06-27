import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./FeaturedGallery.module.css";

import img1 from "../../../assets/images/gallery/gallery1.jpg";
import img2 from "../../../assets/images/gallery/gallery2.jpg";
import img3 from "../../../assets/images/gallery/gallery3.jpg";
import img4 from "../../../assets/images/gallery/gallery4.jpg";

export default function FeaturedGallery() {
  return (
    <Section>
      <Container>

        <SectionTitle
          badge="Featured Artwork"
          title="Some of My Favourite Creations"
          subtitle="A glimpse into portraits, coloured pencils, acrylics and mixed media artworks."
        />

        <div className={styles.grid}>

          <div className={styles.large}>
            <img src={img1} alt="" />
          </div>

          <div>
            <img src={img2} alt="" />
          </div>

          <div>
            <img src={img3} alt="" />
          </div>

          <div>
            <img src={img4} alt="" />
          </div>

        </div>

        <div className={styles.button}>
          <PrimaryButton>
            View Full Gallery
          </PrimaryButton>
        </div>

      </Container>
    </Section>
  );
}