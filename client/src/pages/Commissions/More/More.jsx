import { useEffect, useState } from "react";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import more from "../data/more";

import styles from "./More.module.css";
import SectionTitle from "../../../components/ui/SectionTitle/SectionTitle";
import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";

function MoreCard({ item, onBook }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === item.previewImages.length - 1 ? 0 : prev + 1,
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [item.previewImages.length]);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {item.previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={item.title}
            className={`${styles.previewImage} ${
              currentImage === index ? styles.activeImage : ""
            }`}
          />
        ))}

        <div className={styles.dots}>
          {item.previewImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`${styles.dot} ${
                currentImage === index ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <h3>{item.title}</h3>

        <p>{item.description}</p>

        <PrimaryButton onClick={onBook}>Enquire Now</PrimaryButton>
      </div>
    </article>
  );
}

export default function More({ onBook }) {
  return (
    <section className={styles.section}>
      <SectionTitle>Beyond Portraits</SectionTitle>
      <div className={styles.subheading}>
        <SectionSubTitle>
          Discover custom jacket paintings and heartfelt pet portraits, each
          handcrafted with the same care, creativity, and attention to detail as
          every portrait commission.
        </SectionSubTitle>
      </div>
      <div className={styles.grid}>
        {more.map((item) => (
          <MoreCard key={item.id} item={item} onBook={onBook} />
        ))}
      </div>
    </section>
  );
}
