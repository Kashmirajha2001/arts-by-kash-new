import styles from "./SectionSubTitle.module.css";

export default function SectionSubTitle({ children }) {
  return (
    <span className={styles.subtitle}>
      {children}
    </span>
  );
// Can be used as too
//   <SectionTitle align="left">
//     Learn the Art of...
// </SectionTitle>
}