import React from "react";
import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaTimes } from "react-icons/fa";
// import visaLogo from "./assets/visa.png";
// import mastercardLogo from "./assets/mastercard.png";
// import almaLogo from "./assets/alma.png";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <hr></hr>
      <div className={styles.footerLogo}>
        <h2>
          Furni<span>Flex</span>.
        </h2>
      </div>
      <hr></hr>
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
        <p>Copyright@2024 FurniFlex. All Rights Reserved.</p>
        <div className={styles.socialIcons}>
          <FaInstagram />
          <FaTimes />
          <FaFacebook />
        </div>
        <div className={styles.paymentIcons}>
          {/* <img src={visaLogo} alt="Visa" />
          <img src={mastercardLogo} alt="MasterCard" />
          <img src={almaLogo} alt="Alma" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
