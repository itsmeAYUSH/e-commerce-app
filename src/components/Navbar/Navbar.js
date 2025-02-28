import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.log}>FurniFlex.</div>

      <div className={styles.flex}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/products" className={styles.link}>Products</Link>
        <Link to="/categories" className={styles.link}>Categories</Link>
        <Link to="/about" className={styles.link}>About Us</Link>
        <Link to="/contact" className={styles.link}>Contact Us</Link>
        <Link to="/blog" className={styles.link}>Blog</Link>
      </div>

      <div className={styles.flex}>
        <SearchRoundedIcon className={styles.icon} />
        <FavoriteRoundedIcon className={styles.icon} />
        <LocalMallRoundedIcon className={styles.icon} />
        <AccountCircleRoundedIcon className={styles.icon} />
      </div>
    </div>
  );
};

export default Navbar;
