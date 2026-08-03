import styles from "./AssignmentUpload.module.css";

export default function AssignmentUpload() {
  return (
    <section className={styles.card}>
      <h3>Upload Exercise</h3>
      <p>UI placeholder for images, PDF or ZIP submissions. Backend feedback comes later-AssignmentUpload.jsx</p>
      <input className={styles.input} type="file" accept="image/*,.pdf,.zip" />
    </section>
  );
}
