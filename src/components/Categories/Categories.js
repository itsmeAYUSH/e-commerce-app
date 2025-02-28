import React, { useState } from "react";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import styles from "./Categories.module.css";

const categoryData = [
  { name: "Side Table", products: "120", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { name: "Arm Chair", products: "45", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { name: "Dinner Table", products: "120", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { name: "Pillow", products: "150", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { name: "Wall Clock", products: "40", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
];

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? categoryData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === categoryData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <React.Fragment>
      {/* Header Section */}
      <div className={styles.categories}>
        <h2>Featured Categories</h2>
        <div>
          <Button className={styles.btn} onClick={prevSlide}>
            <WestIcon />
          </Button>
          <Button className={styles.btn} onClick={nextSlide}>
            <EastIcon />
          </Button>
        </div>
      </div>

      {/* Items Section */}
      <div className={styles.items}>
        {categoryData.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <h3>{item.name}</h3>
            <p className={styles.description}>Discover {item.products} Products</p>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className={styles.dots}>
        {categoryData.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Categories;
