import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.Navbar}>
      {/* Logo Section */}
      <div className={styles.footerLogo} onClick={() => navigate("/")}>
        <h2>
          Furni<span>Flex</span>.
        </h2>
      </div>

      {/* Navigation Links */}
      <div className={styles.flex}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/products" className={styles.link}>
          Products
        </Link>
        <Link to="/categories" className={styles.link}>
          Categories
        </Link>
        <Link to="/about" className={styles.link}>
          About Us
        </Link>
        <Link to="/contact" className={styles.link}>
          Contact Us
        </Link>
        <Link to="/blog" className={styles.link}>
          Blog
        </Link>
      </div>

      {/* Icons with Navigation */}
      <div className={styles.flex}>
        <SearchRoundedIcon
          className={styles.icon}
          onClick={() => navigate("/search")}
        />
        <FavoriteRoundedIcon
          className={styles.icon}
          onClick={() => navigate("/wishlist")}
        />
        <LocalMallRoundedIcon
          className={styles.icon}
          onClick={() => navigate("/cart")}
        />
        <AccountCircleRoundedIcon
          className={styles.icon}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default Navbar;
