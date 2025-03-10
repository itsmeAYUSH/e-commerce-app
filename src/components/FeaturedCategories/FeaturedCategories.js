import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import styles from "./FeaturedCategories.module.css";

const categoryData = [
  { name: "Side Table", products: "120", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
  { name: "Arm Chair", products: "45", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
  { name: "Dinner Table", products: "120", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
  { name: "Pillow", products: "150", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
  { name: "Wall Clock", products: "40", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
  { name: "Sofa", products: "80", image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg" },
];

const FeaturedCategories = () => {
  const [items, setItems] = useState(categoryData);
  const [offset, setOffset] = useState(0);
  const itemWidth = 200; // Adjust width as per CSS

  const moveLeft = () => {
    setOffset(-itemWidth);
    setTimeout(() => {
      const updatedItems = [...items];
      updatedItems.push(updatedItems.shift()); // Move first item to end
      setItems(updatedItems);
      setOffset(0);
    }, 500); // Wait for transition
  };

  const moveRight = () => {
    setOffset(itemWidth);
    setTimeout(() => {
      const updatedItems = [...items];
      updatedItems.unshift(updatedItems.pop()); // Move last item to front
      setItems(updatedItems);
      setOffset(0);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveLeft();
    }, 2000); // Auto slide every 2s

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div>
      {/* Header */}
      <div className={styles.categories}>
        <h2>Featured Categories</h2>
        <div>
          <Button className={styles.btn} onClick={moveRight}>
            <WestIcon />
          </Button>
          <Button className={styles.btn} onClick={moveLeft}>
            <EastIcon />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className={styles.itemsWrapper}>
        <div
          className={styles.items}
          style={{
            transform: `translateX(${offset}px)`,
            transition: offset ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {items.map((item, index) => (
            <div key={index} className={styles.item} style={{ width: itemWidth }}>
              <div className={styles.imageContainer}>
                <img src={item.image} alt={item.name} className={styles.image} />
              </div>
              <h3>{item.name}</h3>
              <p className={styles.description}>Discover {item.products} Products</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
