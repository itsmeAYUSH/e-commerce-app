import React from "react";
import styles from "./Collection.module.css";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded"; // For "Hassle Free Returns"

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
      {/* collestions-card */}
      {/* <div className={styles.Collection}>
        <div className={styles.CollectionCards}>
          <div className={styles.title}> furniture design ideas</div>
          <h2>Center table</h2>
          <p>Square table</p>
          <h2>Round table</h2>
          <h2>Wooden table</h2>
          <h2>Glass table</h2>
          <div className={styles.followIg}>View All</div>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Collection;
