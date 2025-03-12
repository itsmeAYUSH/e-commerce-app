import React from "react";
import styles from "./NewsLetter.module.css";

const NewsLetter = () => {
  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>Subscribe To Our<br></br> Newsletter</h2>
        <p className={styles.newsletterText}>
          Subscribe to our email newsletter today to receive updates on the
          latest news
        </p>
        <div className={styles.newsletterInputContainer}>
          <input
            type="email"
            placeholder="Enter your Email"
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterButton}>Subscribe</button>
        </div>
      </div>
      <div className={styles.newsletterImage}>
        <img
          src="https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Newsletter"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
