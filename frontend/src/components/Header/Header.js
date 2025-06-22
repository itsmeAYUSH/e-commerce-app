import React from "react";
import styles from "./Header.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import CallRoundedIcon from "@mui/icons-material/CallRounded";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.social}>
        <p>Follow Us</p>
        <FacebookIcon className={styles.icons} />
        <InstagramIcon className={styles.icons} />
        <XIcon className={styles.icons} />
      </div>
      <p>Sign Up & get 20% Off for all collection</p>
      <div className={styles.social}>
        <CallRoundedIcon className={styles.icons} />
        <p>+91 887952074x</p>
      </div>
    </div>
  );
};

export default Header;
