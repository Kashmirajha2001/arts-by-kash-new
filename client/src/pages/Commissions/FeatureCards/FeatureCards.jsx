import SectionSubTitle from "../../../components/ui/SectionSubTitle/SectionSubTitle";
import featureData from "../data/featureData";

import styles from "./FeatureCards.module.css";

export default function FeatureCards() {
  return (
    <section className={styles.section}>
      <SectionSubTitle>
        Every artwork is handcrafted with attention to detail using premium
        materials and delivered safely to your doorstep.
      </SectionSubTitle>

      <div className={styles.grid}>
        {featureData.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Icon className={styles.icon} />
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </article>
          );
        })}
      </div>

      <p className={styles.note}>
        *Completion time may vary depending on artwork size and complexity.
      </p>
    </section>
  );
}
