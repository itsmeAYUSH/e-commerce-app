import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import Button from "@mui/material/Button";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import BusinessIcon from "@mui/icons-material/Business";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../../contexts/SnackbarContext";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make sure this URL points to your actual backend server
      const response = await fetch(
        "https://e-commerce-app-p1sv.onrender.com/api/contact/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check response type before trying to parse as JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        // Success handling
        showSnackbar("Message sent successfully! We'll get back to you soon.", "success");

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        // Not JSON response, handle as text
        const textResponse = await response.text();
        console.error("Received non-JSON response:", textResponse);
        throw new Error("Server returned an unexpected response");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showSnackbar(error.message || "Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Contact Header */}
      <div className={styles.contactHeader}>
        <h2>Contact Us</h2>
      </div>

      <div className={styles.container}>
        {/* Left Section - Contact Details */}
        <div className={styles.leftSection}>
          <h2>Get in touch</h2>
          <p className={styles.description}>
            We're here for you every step of the way. Whether you have
            questions, need order assistance, or want to share feedback, our
            friendly customer support team is ready to assist. Our team is here
            to help! Reach out to us via
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.icons}>
                <MailOutlineIcon />
              </span>
              <p>furniflex123@gmail.com</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icons}>
                <CallRoundedIcon />
              </span>
              <p>+91 1234567890</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icons}>
                <BusinessIcon />
              </span>
              <p>Saki Naka, Andheri, Mumbai, Maharashtra</p>
            </div>
            <h2>Stay Connected!</h2>
            <div className={styles.socialIcons}>
              <FacebookIcon className={styles.icons} />
              <InstagramIcon className={styles.icons} />
              <XIcon className={styles.icons} />
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className={styles.rightSection}>
          <h2 className={styles.formTitle}>Send us a message</h2>
          <p className={styles.formDescription}>
            Your email address will not be published. Required fields are marked
          </p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.input}
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className={styles.textarea}
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <Button
              type="submit"
              variant="contained"
              className={styles.submitButton}
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section - Now with properly centered pin */}
      <div className={styles.mapWrapper}>
        <div className={styles.mapContainer}>
          <iframe
            title="Furniflex Location"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.876275%2C19.079664%2C72.896475%2C19.099664&layer=mapnik&marker=19.089664%2C72.886375"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <div className={styles.mapLinkContainer}>
            <a
              href="https://www.openstreetmap.org/?mlat=19.089664&mlon=72.886375#map=15/19.089664/72.886375"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              View Larger Map
            </a>
          </div>
        </div>
      </div>

      <Collection />
      <Footer />
    </div>
  );
};

export default ContactUs;