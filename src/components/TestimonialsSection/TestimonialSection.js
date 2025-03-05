import React, { useState, useEffect } from "react";
import styles from "./TestimonialSection.module.css";
import { Button } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

const testimonials = [
  {
    id: 1,
    name: "Emily K.",
    location: "New York, NY",
    text: "I recently purchased a beautiful dining set from FurniFlex, and I couldn't be happier! The quality is top-notch, and it looks even better in person than it did online. Plus, the customer service team was incredibly helpful throughout the entire process. Highly recommend.",
    image:
      "https://images.pexels.com/photos/7752822/pexels-photo-7752822.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Sophia L.",
    location: "Los Angeles, CA",
    text: "Absolutely love the furniture I bought from FurniFlex! The delivery was smooth, and the quality exceeded my expectations.",
    image:
      "https://images.pexels.com/photos/7752791/pexels-photo-7752791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "John D.",
    location: "Chicago, IL",
    text: "Great experience! The furniture is well-built, and the designs are modern. Will definitely shop here again.",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const blogPosts = [
  {
    title: "First Time Home Owner Ideas",
    author: "Kristin Watson",
    date: "Apr 19, 24",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080&fit=crop",
  },
  {
    title: "How To Keep Your Furniture Clean",
    author: "Robert Fox",
    date: "Apr 20, 24",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080&fit=crop",
  },
  {
    title: "Small Space Furniture Apartment Ideas",
    author: "Kristin Watson",
    date: "Dec 20, 24",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080&fit=crop",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const totalTestimonials = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* testimonial section */}
      <div className={styles.categories}>
        <h2>
          Don't take our words,<br></br>See what our clients say
        </h2>
        <div>
          <Button className={styles.btn} onClick={handlePrev}>
            <WestIcon />
          </Button>
          <Button className={styles.btn} onClick={handleNext}>
            <EastIcon />
          </Button>
        </div>
      </div>
      <div className={styles["testimonial-section"]}>
        <div className={styles["testimonial-container"]}>
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className={`${styles["testimonial-card"]} ${
                i === index ? styles.active : ""
              }`}
            >
              <img
                alt={`Portrait of ${testimonial.name}`}
                height="300"
                src={testimonial.image}
                width="300"
              />
              <div className={styles["text-container"]}>
                <p>{testimonial.text}</p>
                <div>
                  <p className={styles.name}>{testimonial.name}</p>
                  <p className={styles.location}>- {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
