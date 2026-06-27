import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import AboutImage from "../../assets/images/placeholders/about-image.png";

import styles from "./About.module.css";

export default function About() {
  return (
    <Section>

      <Container>

        <div className={styles.about}>

          <div className={styles.imageWrapper}>

            <img
              src={AboutImage}
              alt="Artist"
              className={styles.aboutImage}
            />

            <div className={styles.statCard}>

              <div>
                <h3>150+</h3>
                <p>Happy Clients</p>
              </div>

              <div>
                <h3>5000+</h3>
                <p>Students</p>
              </div>

              <div>
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>

            </div>

          </div>

          <div className={styles.content}>

            <div className={styles.badge}>
              About the Artist
            </div>

            <h2>
              Every artwork begins with a story.
            </h2>

            <p>
              Arts by Kash was created with a simple goal — to transform memories into timeless works of art while inspiring others to discover the joy of drawing. From realistic portraits to online courses, every creation is made with patience, passion, and attention to detail.
            </p>

            <p>
              Whether you're looking for a custom portrait or beginning your artistic journey, you'll find a space built with creativity, learning, and heartfelt craftsmanship.
            </p>

            <PrimaryButton>
              Know My Journey
            </PrimaryButton>

          </div>

        </div>

      </Container>

    </Section>
  );
}