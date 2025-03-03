import React from "react";
import styles from "./AboutUs.module.css";
import Collection from "../../components/Collection/Collection";
import Footer from "../../components/Footer/Footer";
import TestimonialSection from "../../components/TestimonialsSection/TestimonialSection";

const AboutUs = () => {
  return (
    <div>
      <div className={styles.aboutHeader}>
        <h2>About Us</h2>
      </div>
      <h2 className={styles.aboutText}>
        Discover furniflex <br></br>Where Innovation Meets Design.
      </h2>
      <img
        className={styles.aboutImage}
        src="https://plus.unsplash.com/premium_photo-1683141035520-9b1e20a92382?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ></img>
      {/* here add maps  */}
      <TestimonialSection />
      <Collection />
      <Footer />
    </div>
  );
};
export default AboutUs;
