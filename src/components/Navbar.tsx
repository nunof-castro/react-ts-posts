import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <p className={styles.logo}>React-Posts</p>
      <nav aria-label="Main navigation" className={styles.links}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
