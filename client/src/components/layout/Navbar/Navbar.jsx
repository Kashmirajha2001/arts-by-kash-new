import { useState } from "react";
import styles from "./Navbar.module.css";
// import navigation from "../../../constants/navigation.js";
import navigation from "../../../constants/navigation";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import useScroll from "../../../hooks/useScroll";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  // Temporary until authentication is implemented
  const isLoggedIn = false;

  const user = {
    name: "Kashmira",
  };

  //   const { user } = useAuth();
  // const isLoggedIn = !!user;

  return (
    // <header className={styles.navbar}>
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        {/* <div className={styles.logo}>Arts by Kash</div> */}
        <NavLink to="/" className={styles.logo}>
          Arts by Kash
        </NavLink>

        {/* Navigation */}
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

        <div className={styles.actions}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <button className={styles.userButton}>
                <div className={styles.avatar}>{user.name.charAt(0)}</div>

                <span>{user.name}</span>
              </button>
            </div>
          ) : (
            <>
              <PrimaryButton variant="outline" to="/auth?mode=login">
                Login
              </PrimaryButton>
              <PrimaryButton to="/auth?mode=register">Get Started</PrimaryButton>

              {/* <PrimaryButton to="/commissions">Book a Commission</PrimaryButton> */}
            </>
          )}

          <button
            type="button"
            className={`${styles.menuButton} ${
              menuOpen ? styles.menuButtonOpen : ""
            }`}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

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
      </div>
    </header>
  );
}
