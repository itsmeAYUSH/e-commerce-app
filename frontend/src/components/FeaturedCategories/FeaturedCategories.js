import { useState, useRef, useEffect } from "react";
import styles from "./FeaturedCategories.module.css"; // Fixed the import extension
import { useNavigate } from "react-router-dom";

// Sample data
const categoryData = [
  {
    name: "Side Table",
    products: "120",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Arm Chair",
    products: "45",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dinner Table",
    products: "120",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pillow",
    products: "150",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Wall Clock",
    products: "40",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sofa",
    products: "80",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cabinet",
    products: "65",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lamp",
    products: "90",
    image:
      "https://plus.unsplash.com/premium_photo-1670076735810-26d92491df5c?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedCategories = () => {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const navigate = useNavigate();

  // Calculate maximum scroll width on mount and resize
  useEffect(() => {
    const calculateMaxScroll = () => {
      if (sliderRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth;
        const clientWidth = sliderRef.current.clientWidth;
        setMaxScroll(scrollWidth - clientWidth);
      }
    };

    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);

    return () => window.removeEventListener("resize", calculateMaxScroll);
  }, []);

  // Update scroll position when slider scrolls
  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
    }
  };

  // Scroll by a fixed amount
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.productSliderContainer}>
      {/* Header section */}
      <div className={styles.sliderHeader}>
        <div>
          <h2 className={styles.sliderTitle}>Featured Categories</h2>
          <p className={styles.sliderSubtitle}>
            Explore our curated selection of furniture categories
          </p>
        </div>

        <div className={styles.navButtonsContainer}>
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 10}
            className={styles.navButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll - 10}
            className={styles.navButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div className={styles.sliderContainer}>
        {/* Scroll progress indicator */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${
                maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0
              }%`,
            }}
          ></div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className={styles.cardsContainer}
        >
          {categoryData.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.cardImageContainer}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{category.name}</h3>
                <div className={styles.cardFooter}>
                  <p className={styles.productCount}>
                    {category.products} Products
                  </p>
                  <span className={styles.exploreLink}>
                    <span  onClick={() => navigate('/products')}
                    style={{ cursor: 'pointer' }}>Explore</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"  
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={styles.exploreIcon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shadow indicators for scroll */}
        <div
          className={styles.shadowIndicatorLeft}
          style={{ opacity: scrollPosition <= 10 ? 0 : 1 }}
        ></div>
        <div
          className={styles.shadowIndicatorRight}
          style={{ opacity: scrollPosition >= maxScroll - 10 ? 0 : 1 }}
        ></div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
