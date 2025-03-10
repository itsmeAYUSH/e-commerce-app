import React from "react";
import styles from "./Favorite.module.css";
import { Container, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../Pages/Products/Products";
import { products } from "../../util/data";

const Favorite = ({ favorites = products }) => {
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
                <ProductCard product={product} isFavorite={true} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Favorite;
