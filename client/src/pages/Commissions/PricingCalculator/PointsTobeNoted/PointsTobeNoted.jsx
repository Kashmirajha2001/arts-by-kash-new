import styles from "./PointsTobeNoted.module.css";

const points = [
  "Extra charges may apply for detailed backgrounds.",
  "50% advance payment is required to confirm your commission.",
  "Remaining 50% is payable after artwork completion.",
  "Shipping and framing charges are not included.",
  "Reference photos should be clear and high quality.",
];

export default function PointsTobeNoted() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <h2>Points To be Noted</h2>

        <div className={styles.divider}>
          <span>✦</span>
        </div>
      </div>

      <ul className={styles.list}>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );
}