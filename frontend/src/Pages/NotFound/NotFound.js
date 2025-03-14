import React from "react";
import Footer from "../../components/Footer/Footer";
import styles from "./NotFound.module.css";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const ClickHandler = () => {
    navigate("/");
  };
  return (
    <div>
      <div className={styles.notFound}>
        <img className={styles.notFoundImg} src="/images/notFound.png" alt="404 page Not Found"></img>
        <h2>Page Not Found</h2>
        <p>Sorry, we can not find the page you are looking for.</p>
        <Button className={styles.backBtn} onClick={ClickHandler}>
          <WestIcon />
          Back to home
        </Button>
      </div>
      <Footer />
    </div>
  );
};
export default NotFound;
