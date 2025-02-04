import React from "react";
import styles from "./NavBar.module.css"; 

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>Talent Tracker</div>
      <ul className={styles.navbarLinks}>
        <li className={styles.navbarItem}>
          <a href="/" className={styles.navbarLink}>Home</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/candidates" className={styles.navbarLink}>Candidates</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/saved" className={styles.navbarLink}>Saved</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
