import React, { useState } from "react";
import styles from "./NewsLetter.module.css";
import { Snackbar, Alert } from "@mui/material";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        setSnackbar({
          open: true,
          message: "Successfully subscribed to the newsletter!",
          severity: "success",
        });
        setEmail("");
      } else {
        setSnackbar({
          open: true,
          message: "Error subscribing. Please try again later.",
          severity: "error",
        });
      }
    }, 500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewsLetter;
