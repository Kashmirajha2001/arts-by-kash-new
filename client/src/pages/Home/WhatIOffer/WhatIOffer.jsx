import Section from "../../../components/ui/Section/Section";
import Container from "../../../components/ui/Container/Container";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";

import OfferCard from "../../../components/shared/OfferCard/OfferCard";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

import commission from "../../../assets/images/offers/commission.jpg";
import artworks from "../../../assets/images/offers/artworks.jpg";
import courses from "../../../assets/images/offers/courses.jpg";

import styles from "./WhatIOffer.module.css";

import { LuPaintbrush, LuPalette, LuBookOpen } from "react-icons/lu";

export default function WhatIOffer() {
  return (
    <Section>
      <Container>
        <div className={styles.heading}>
          {/* <span className={styles.subtitle}>EXPLORE WHAT I OFFER</span> */}
          <SectionSubTitle> EXPLORE WHAT I OFFER</SectionSubTitle>

          <SectionTitle>Art created with purpose.</SectionTitle>

          <p>
            Whether you're looking for custom portraits, original artworks or
            online learning, there's something here for you.
          </p>
        </div>

        <div className={styles.cards}>
          <OfferCard
            image={commission}
            icon={<LuPaintbrush />}
            title="Portrait Commissions"
            description="Handmade portraits crafted with love and fine details."
            button="Book now"
            link="/commissions"
          />

          <OfferCard
            image={artworks}
            icon={<LuPalette />}
            title="Original Artworks"
            description="Original paintings and exclusive handmade creations."
            button="Shop now"
            link="/shop"
          />

          <OfferCard
            image={courses}
            icon={<LuBookOpen />}
            title="Online Courses"
            description="Learn realistic drawing through structured lessons."
            button="Enroll now"
            link="/courses"
          />
        </div>
      </Container>
    </Section>
  );
}
