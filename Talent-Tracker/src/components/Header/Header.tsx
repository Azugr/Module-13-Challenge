import React from "react";
import styles from "./Header.module.css"; 

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Talent Tracker</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="/candidates" className={styles.navLink}>Candidates</a>
          </li>
          <li className={styles.navItem}>
            <a href="/saved" className={styles.navLink}>Saved</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
