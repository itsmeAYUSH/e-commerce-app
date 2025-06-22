import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../../components/Footer/Footer";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Bed Room",
      description: "Create your perfect sanctuary with our bedroom collections",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 120,
    },
    {
      id: 2,
      name: "Living Room",
      description: "Stylish and comfortable furniture for your living space",
      image: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 85,
    },
    {
      id: 3,
      name: "Office",
      description: "Professional and ergonomic workspace solutions",
      image: "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 65,
    },
    {
      id: 4,
      name: "Kitchen",
      description: "Functional and beautiful kitchen furniture and accessories",
      image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 50,
    },
    {
      id: 5,
      name: "Outdoor",
      description: "Weather-resistant furniture for your outdoor spaces",
      image: "https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 40,
    },
    {
      id: 6,
      name: "Decor",
      description: "Finishing touches to complement your interior design",
      image: "https://images.unsplash.com/photo-1719941032563-75921fe474fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      items: 95,
    },
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page with the selected category as a filter
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesHeader}>
        <h2>Categories</h2>
      </div>

      <Container className={styles.mainContent}>
        <div className={styles.introSection}>
          <Typography variant="h4" className={styles.sectionTitle}>
            Browse Our Collections
          </Typography>
          <Typography variant="body1" className={styles.sectionDescription}>
            Discover furniture pieces that perfectly match your style and needs.
            Each category offers carefully curated selections to enhance every
            room in your home.
          </Typography>
        </div>

        <Grid container spacing={4} className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <div
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={styles.categoryImageContainer}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay}>
                    <span className={styles.itemCount}>
                      {category.items}+ Items
                    </span>
                  </div>
                </div>
                <div className={styles.categoryContent}>
                  <Typography variant="h5" className={styles.categoryTitle}>
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.categoryDescription}
                  >
                    {category.description}
                  </Typography>
                  <Button
                    className={styles.viewButton}
                    onClick={() => handleCategoryClick(category.name)}
                    endIcon={<ArrowForwardIcon />}
                  >
                    View Collection
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        <div className={styles.browseAllSection}>
          <Button
            variant="contained"
            className={styles.browseAllButton}
            onClick={() => navigate("/products")}
          >
            Browse All Products
          </Button>
        </div>
      </Container>
      <Footer/>
    </div>
  );
};

export default Categories;
