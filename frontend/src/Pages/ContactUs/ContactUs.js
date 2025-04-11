import React from "react";
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
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ContactUs = () => {
  const mapCenter = {
    lat: 19.076, // Replace with your latitude
    lng: 72.8777, // Replace with your longitude
  };
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };
  return (
    <div>
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
              <p>furniflex@furniflex.com</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icons}>
                <CallRoundedIcon />
              </span>
              <p>+001234567890</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.icons}>
                <BusinessIcon />
              </span>
              <p>Saki Naka, Andheri, Mumbai, Maharashtra</p>
            </div>
            <h2>Stay Connected!</h2>
            <div>
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
            Your email address will not be published.Required fields are marked
          </p>

          <form className={styles.contactForm}>
            <input type="text" placeholder="Name" className={styles.input} />
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className={styles.input}
            />
            <textarea
              placeholder="Message"
              className={styles.textarea}
            ></textarea>
            <Button type="submit" className={styles.submitButton}>
              Submit
            </Button>
          </form>
        </div>
      </div>
      {/* Google Map Section */}
      <div className={styles.mapContainer}>
        <LoadScript googleMapsApiKey="AlzaSyKJXTavHD01DYf8iIrcbQ4sm4CYnoLYDcj">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
      <Collection />
      <Footer />
    </div>
  );
};

export default ContactUs;
