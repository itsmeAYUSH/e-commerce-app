import React from "react";
import styles from "./Collection.module.css";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

const Collection = () => {
  return (
    <React.Fragment>
      <div className={styles.feature}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <LocalShippingRoundedIcon className={styles.icons} />
          </div>
          <div className={styles.text}>Fast & Free Shipping</div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <ShoppingBagRoundedIcon className={styles.icons} />
          </div>
          <div className={styles.text}>Easy to Shop</div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <SupportAgentRoundedIcon className={styles.icons} />
          </div>
          <div className={styles.text}>24/7 Support</div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <AutorenewRoundedIcon className={styles.icons} />
          </div>
          <div className={styles.text}>Hassle Free Returns</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Collection;
