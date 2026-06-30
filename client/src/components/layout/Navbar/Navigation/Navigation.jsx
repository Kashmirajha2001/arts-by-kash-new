import { NavLink } from "react-router-dom";
// import navigation from "../../../constants/navigation";

export default function Navigation({ navigation }) {
  return (
    <nav className={styles.navMenu}>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
