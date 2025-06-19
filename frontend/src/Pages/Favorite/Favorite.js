import React from "react";
import styles from "./Favorite.module.css";
import { Container, Grid, Typography, Button, CircularProgress } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard"; // Adjust the path as necessary
import { useFavorites } from "../../store/FavoritesContext"; // Import the useFavorites hook
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Favorite = () => {
  const { favorites, loading, error } = useFavorites();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Typography color="error">Error loading favorites: {error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/products")}
          style={{ marginTop: '1rem' }}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.favoritesHeader}>
        <Typography variant="h4" component="h2" align="center">
          Your Favorites
        </Typography>
      </div>
      <Container className={styles.favoritesContainer}>
        {!favorites || favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h6" align="center" style={{ marginBottom: '1rem' }}>
              No favorite products added.
            </Typography>
            <Button 
              variant="contained"
              className={styles.browseAllButton}
              onClick={() => navigate("/products")}
            >
              Browse All Products
            </Button>
          </div>
        ) : (
          <>
            <Grid container spacing={3} justifyContent="start">
              {favorites.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
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
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Favorite;
