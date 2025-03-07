import React from "react";
import Button from "@mui/material/Button";
import styles from "./Homepage.module.css";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles.title}> furniture design ideas</div>
        <h1>Modern Interior Design Studio</h1>
        <p>
          Choosing the right furniture for your home online will add elegance
          and functionality to your interior while also being cost effective and
          long lasting.
        </p>
        {/* <button>Shop now</button> */}
        <div className={styles.flex}>
          <Button className={styles.btn12} onClick={() => navigate("/products")}>
            Shop now <EastRoundedIcon />{" "}
          </Button>
          <div className={styles.followIg}>Follow Instagram</div>
        </div>
        <div className={styles.stats}>
          <div>
            <h3>2500+</h3>
            <p>Unique Styles</p>
          </div>

          <div>
            <h3>5000+</h3>
            <p>Happy Customer</p>
          </div>
          <div>
            <h3>300+</h3>
            <p>Certified Outlets</p>
          </div>
        </div>
      </div>
      {/* <Collection />
      <Categories />
      <Trending />
      <TestimonialSection />
      <QuestionAnswer />
      <NewsLetter />
      <Footer /> */}
    </div>
  );
};

export default Homepage;
