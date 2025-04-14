import React from "react";
import styles from "./Favorite.module.css";
import { Container, Grid, Typography, Button } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard"; // Adjust the path as necessary
import { useFavorites } from "../../store/FavoritesContext"; // Import the useFavorites hook
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Favorite = () => {
  const { state } = useFavorites(); // Get favorites from context
  const { favorites } = state;
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.favoritesHeader}>
        <Typography variant="h4" component="h2" align="center">
          Your Favorites
        </Typography>
      </div>
      <Container className={styles.favoritesContainer}>
        {favorites.length === 0 ? (
          <Typography variant="h6" align="center" style={{ marginTop: "10px" }}>
            No favorite products added.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="start">
            {favorites.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
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
      <Footer />
    </div>
  );
};

export default Favorite;
