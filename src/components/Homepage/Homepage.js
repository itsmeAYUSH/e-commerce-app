import React from "react";
import Button from "@mui/material/Button";
import styles from "./Homepage.module.css";
import EastRoundedIcon from "@mui/icons-material/EastRounded";

const Homepage = () => {
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
          <Button className={styles.btn12}>
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
    </div>
  );
};

export default Homepage;
