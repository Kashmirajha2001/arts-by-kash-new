import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import navigation from "../../../constants/navigation";
import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";
import useScroll from "../../../hooks/useScroll";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  FiUser,
  FiHeart,
  FiBookOpen,
  FiShoppingBag,
  FiGrid,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { showSuccess, showError } from "../../../utils/toast";

export default function Navbar() {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { user, logout } = useAuth();
  const firstName = user?.name?.split(" ")[0];
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
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
          <div className={styles.userMenu} ref={profileRef}>
            {isLoggedIn ? (
              <>
                <button
                  className={styles.userButton}
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <div className={styles.avatar}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={styles.avatarImage}
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  <span className={styles.userName}>{firstName}</span>

                  <span
                    className={`${styles.arrow} ${
                      profileOpen ? styles.arrowOpen : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {profileOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.mobileUser}>
                      <div className={styles.dropdownAvatar}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span>{user.name}</span>
                    </div>

                    <button>
                      <FiGrid />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/my-account");
                      }}
                    >
                      <FiUser />
                      <span>My Profile</span>
                    </button>

                    <button>
                      <FiHeart />
                      <span>Wishlist</span>
                    </button>

                    <button>
                      <FiBookOpen />
                      <span>My Courses</span>
                    </button>

                    <button>
                      <FiShoppingBag />
                      <span>My Orders</span>
                    </button>

                    <hr className={styles.divider} />

                    <button
                      className={styles.logout}
                      onClick={async () => {
                        await logout();
                        showSuccess("You have been successfully logged out!");
                        setProfileOpen(false);
                      }}
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Desktop Login Buttons */}
                <div className={styles.desktopAuth}>
                  <PrimaryButton variant="outline" to="/auth?mode=login">
                    Login
                  </PrimaryButton>

                  <PrimaryButton to="/auth?mode=register">
                    Get Started
                  </PrimaryButton>
                </div>

                {/* Mobile Profile Icon */}
                <button
                  className={styles.mobileProfileButton}
                  onClick={() => navigate("/auth?mode=login")}
                  aria-label="Login"
                >
                  <FiUser />
                </button>
              </>
            )}
          </div>

          <div ref={mobileMenuRef}>
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
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
