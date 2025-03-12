import React from "react";
import styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <hr className={styles.line}></hr>
      <div className={styles.footerLogo}>
        <h2>
          Furni<span>Flex</span>.
        </h2>
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.footerTop}>
        <div className={styles.footerLinks}>
          <div className={styles.footerSection}>
            <h4>About</h4>
            <ul>
              <li>Our Company</li>
              <li>Our Story</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Information</h4>
            <ul>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Return</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>Help</li>
              <li>FAQ</li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright@2025 FurniFlex. All Rights Reserved.</p>
        <div>
        <FacebookIcon className={styles.icons} />
        <InstagramIcon className={styles.icons} />
        <XIcon className={styles.icons} />
        </div>
        <div className={styles.paymentIcons}>
          <img src="/images/upi.png" alt="UPI" />
          <img src="/images/mastercard.png" alt="MasterCard" />
          <img src="/images/visa.jpg" alt="Visa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
