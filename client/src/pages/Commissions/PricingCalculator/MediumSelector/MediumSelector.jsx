import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./MediumSelector.module.css";

const mediums = [
  {
    id: "graphite",
    title: "Black & White",
    subtitle: "Classic Black & White",
    starting: "₹1,199",
    icon: "✏️",
  },
  {
    id: "color",
    title: "Colour Pencil",
    subtitle: "Hyperrealistic Portraits",
    starting: "₹1,799",
    icon: "🖍️",
  },
  {
    id: "acrylic",
    title: "Acrylic Painting",
    subtitle: "Canvas Painting",
    starting: "Custom",
    icon: "🎨",
  },
];

export default function MediumSelector({ medium, setMedium }) {
  return (
    <>
      <h3 className={styles.heading}>1. Choose Medium</h3>

      <div className={styles.mediumGrid}>
        {mediums.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMedium(item.id)}
            className={`${styles.mediumCard} ${
              medium === item.id ? styles.active : ""
            }`}
          >
            {medium === item.id && (
              <CheckCircleIcon className={styles.checkIcon} />
            )}

            {/* <img src={item.icon} className={styles.mediumImage} /> */}
            {/* .mediumImage{
                width:72px;
                height:72px;
                object-fit:contain;
                margin-bottom:18px;
            } */}

            <span className={styles.icon}>{item.icon}</span>

            <h4>{item.title}</h4>

            <p>{item.subtitle}</p>

            <small>
              Starting from <strong>{item.starting}</strong>
            </small>
          </button>
        ))}
      </div>
    </>
  );
}
