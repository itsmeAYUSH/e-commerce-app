import React from "react";
import styles from "./Favorite.module.css";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard"; // Adjust the path as necessary
import { useFavorites } from "../../store/FavoritesContext"; // Import the useFavorites hook

const Favorite = () => {
  const { state } = useFavorites(); // Get favorites from context
  const { favorites } = state;

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
      </Container>
    </div>
  );
};

export default Favorite;
