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
        alt="img not availabe"
      ></img>
      <p className={styles.aboutUsdescription}>
        <span style={{ display: "block", marginBottom: "20px" }}>
          Welcome to FurniFlex, your go-to destination for premium-quality
          furniture that combines style, comfort, and durability. We are
          committed to bringing you a seamless furniture shopping experience
          with a vast collection of modern, classic, and customizable pieces
          that fit every home, office, and lifestyle.
        </span>

        <span style={{ display: "block", marginBottom: "20px" }}>
          At FurniFlex, we understand that furniture is more than just
          décor—it’s about creating a space that reflects your personality and
          enhances your everyday life. That’s why we source high-quality
          materials and partner with expert craftsmen to bring you furniture
          that is not only stylish but also built to last. Whether you need a
          cozy sofa, a sleek dining table, a functional office desk, or elegant
          bedroom furniture, we have something for every need and preference.
        </span>

        <span style={{ display: "block", marginBottom: "20px" }}>
          Our easy-to-use e-commerce platform ensures a hassle-free shopping
          experience, featuring secure transactions, fast delivery, and
          exceptional customer service. With a focus on affordability and
          excellence, we make it possible for you to furnish your space without
          compromise.
        </span>

        <span style={{ display: "block", marginBottom: "20px" }}>
          Join thousands of satisfied customers who have transformed their homes
          with FurniFlex. Discover timeless designs, innovative solutions, and
          unmatched quality—because great furniture should be both beautiful and
          functional. Experience the FurniFlex difference today!
        </span>
      </p>
      <TestimonialSection />
      <Collection />
      <Footer />
    </div>
  );
};
export default AboutUs;
