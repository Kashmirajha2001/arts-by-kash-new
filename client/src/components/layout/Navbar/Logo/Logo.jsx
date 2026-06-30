import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className={styles.logo}>
      Arts by Kash
    </NavLink>
  );
}
