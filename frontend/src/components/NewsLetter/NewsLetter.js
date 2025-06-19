import React, { useState } from "react";
import styles from "./NewsLetter.module.css";
import { useSnackbar } from "../../contexts/SnackbarContext";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { showSnackbar } = useSnackbar();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleSubscribe = () => {
    // Validate the email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Simulate successful subscription 90% of the time
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        showSnackbar("Successfully subscribed to the newsletter!", "success");
        setEmail("");
      } else {
        showSnackbar("Error subscribing. Please try again later.", "error");
      }
    }, 500);
  };

  return (
    <div className={styles.newsletterContainer}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>Subscribe To Our Newsletter</h2>
        <p className={styles.newsletterText}>
          Subscribe to our email newsletter today to receive updates on the
          latest news
        </p>
        <div className={styles.newsletterInputContainer}>
          <input
            type="email"
            placeholder="Enter your Email"
            className={styles.newsletterInput}
            value={email}
            onChange={handleEmailChange}
          />
          <button className={styles.newsletterButton} onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>
        {emailError && <p className={styles.errorText}>{emailError}</p>}
      </div>
      <div className={styles.newsletterImage}>
        <img
          src="https://plus.unsplash.com/premium_photo-1678752717095-08cd0bd1d7e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Newsletter"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
