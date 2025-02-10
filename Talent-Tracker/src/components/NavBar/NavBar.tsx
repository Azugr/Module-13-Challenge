import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.title}>Talent Tracker</h1>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/CandidatesList" className={styles.navLink}>Candidates List</Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className={styles.navLink}>Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
