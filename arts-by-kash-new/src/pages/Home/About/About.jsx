import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import AboutImage from "../../../assets/images/placeholders/about-image.png";

import styles from "./About.module.css";

export default function About() {
  return (
    <Section>
      <Container>
        <div className={styles.about}>
          <div className={styles.imageWrapper}>
            <img src={AboutImage} alt="About" className={styles.aboutImage} />

            {/* <div className={styles.statCard}>
              <div>
                <h3>150+</h3>
                <span>Happy Clients</span>
              </div>

              <div>
                <h3>5000+</h3>
                <span>Students</span>
              </div>

              <div>
                <h3>5+</h3>
                <span>Years Experience</span>
              </div>
            </div> */}
          </div>

          <div className={styles.content}>
            <div className={styles.badge}>About the Artist</div>

            <h2>Every artwork begins with a story.</h2>

            <p>
              Arts by Kash was created with a simple dream—to transform memories
              into timeless artworks while inspiring others to discover the joy
              of drawing. Every portrait is created with patience, precision,
              and passion.
            </p>

            <p>
              Through commissions and carefully designed online courses, I hope
              to help people preserve their memories and build confidence in
              their artistic journey.
            </p>

            <PrimaryButton>Know My Journey</PrimaryButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
