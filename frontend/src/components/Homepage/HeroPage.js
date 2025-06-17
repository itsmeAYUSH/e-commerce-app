import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./Homepage.module.css";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState(0);
  const roomData = [
    { name: "Bedroom", image: "/images/bedroom.png", items: "1200+" },
    { name: "Living Room", image: "/images/livingroom.png", items: "950+" },
    { name: "Dining Room", image: "/images/waitingroom.png", items: "800+" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoom((prev) => (prev + 1) % roomData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roomData.length]);

  return (
    <div className={styles.homepage}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.title}>furniture design ideas</div>
          <h1>Modern Interior Design Studio</h1>
          <p>
            Choosing the right furniture for your home online will add elegance
            and functionality to your interior while also being cost effective
            and long lasting.
          </p>
          <div className={styles.flex}>
            <Button
              className={styles.btn12}
              onClick={() => navigate("/products")}
            >
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

        <div className={styles.roomShowcase}>
          <div className={styles.roomPreview}>
            {roomData.map((room, index) => (
              <div
                key={index}
                className={`${styles.roomCard} ${
                  activeRoom === index ? styles.activeRoomCard : ""
                }`}
                style={{
                  backgroundImage: `url(${room.image})`,
                  transform: `translateX(${
                    (index - activeRoom) * 110
                  }%) scale(${activeRoom === index ? 1 : 0.85})`,
                  opacity: activeRoom === index ? 1 : 0.6,
                  zIndex:
                    activeRoom === index
                      ? 10
                      : 5 - Math.abs(index - activeRoom),
                }}
              >
                <div className={styles.roomInfo}>
                  <h3>{room.name}</h3>
                  <p>{room.items} items</p>
                </div>
                {activeRoom === index && (
                  <div className={styles.roomSpotlight}></div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.roomControls}>
            <button
              className={styles.roomControlBtn}
              onClick={() =>
                setActiveRoom(
                  (prev) => (prev - 1 + roomData.length) % roomData.length
                )
              }
            >
              <WestRoundedIcon />
            </button>
            <div className={styles.roomIndicators}>
              {roomData.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.roomIndicator} ${
                    activeRoom === index ? styles.activeIndicator : ""
                  }`}
                  onClick={() => setActiveRoom(index)}
                ></span>
              ))}
            </div>
            <button
              className={styles.roomControlBtn}
              onClick={() =>
                setActiveRoom((prev) => (prev + 1) % roomData.length)
              }
            >
              <EastRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
