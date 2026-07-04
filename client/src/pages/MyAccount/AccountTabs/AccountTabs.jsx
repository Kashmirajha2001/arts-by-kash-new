import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import styles from "./AccountTabs.module.css";

const tabs = [
  {
    id: "wishlist",
    label: "Wishlist",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <Inventory2OutlinedIcon />,
  },
  {
    id: "courses",
    label: "My Courses",
    icon: <SchoolOutlinedIcon />,
  },
];

export default function AccountTabs({ activeTab, setActiveTab }) {
  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`${styles.tab} ${
            activeTab === tab.id ? styles.active : ""
          }`}
        >
          {tab.icon}

          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
