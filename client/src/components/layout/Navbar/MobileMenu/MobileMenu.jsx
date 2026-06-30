import { NavLink } from "react-router-dom";
// import navigation from "../../../constants/navigation";

export default function MobileMenu({ navigation }) {
  return (
    <nav
      id="mobile-navigation"
      className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      aria-hidden={!menuOpen}
    >
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
          onClick={() => setMenuOpen(false)}
        >
          {item.name}
        </NavLink>
      ))}

      {!isLoggedIn ? (
        <PrimaryButton to="/auth">Login</PrimaryButton>
      ) : (
        <button className={styles.mobileProfile}>My Dashboard</button>
      )}
    </nav>
  );
}
