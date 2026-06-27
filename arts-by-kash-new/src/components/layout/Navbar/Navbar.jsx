import { useState } from "react";
import styles from "./Navbar.module.css";
import navigation from "../../../constants/navigation";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import useScroll from "../../../hooks/useScroll";

export default function Navbar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <header className={styles.navbar}>
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>Arts by Kash</div>

        {/* Navigation */}
        <nav className={styles.navMenu}>
          {navigation.map((item) => (
            // <a key={item.name} href={item.path}>
            //   {item.name}
            // </a>
            <a
              key={item.name}
              href={item.path}
              className={`${styles.navLink} ${
                item.name === "Home" ? styles.active : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* CTA */}
          <PrimaryButton>Book a Commission</PrimaryButton>

          <button
            type="button"
            className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
            <a
              key={item.name}
              href={item.path}
              className={`${styles.navLink} ${
                item.name === "Home" ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
