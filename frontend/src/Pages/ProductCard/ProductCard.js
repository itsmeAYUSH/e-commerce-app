import React, { useState } from "react";
import { useFavorites } from "../../store/FavoritesContext"; // Import Favorites context
import { useCart } from "../../store/CartContext"; // Import Cart context
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const DiscountBadge = styled("div")({
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#2d5356",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
});

const WishlistButton = styled(IconButton)(({ isFavorite }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  color: isFavorite ? "#F36E0D" : "#B0B0B0",
}));

const ProductCard = ({ product }) => {
  const { state, addFavorite, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Sync local `isFavorite` with global favorites context
  const isFavorite = state.favorites.some((fav) => fav._id === product._id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(product);
      setSnackbarMessage("Removed from favorites!");
    } else {
      addFavorite(product);
      setSnackbarMessage("Added to favorites!");
    }
    setSnackbarOpen(true);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // Safely parse the price - handle both string and number cases
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
        : Number(product.price);

    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: price || 0, // Fallback to 0 if parsing fails
      quantity: 1,
      // image: product.image,
    };

    addItem(itemToAdd);
    setSnackbarMessage("Added to cart!");
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: 3,
        cursor: "pointer",
      }}
    >
      <DiscountBadge>-{product.discount}%</DiscountBadge>
      <WishlistButton onClick={handleFavoriteToggle} isFavorite={isFavorite}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </WishlistButton>

      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
        />
        <CardContent
          sx={{
            backgroundColor: "#2d5356",
            color: "#FEFCE6",
            textAlign: "center",
          }}
        >
          <Tooltip title={product.name} arrow>
            <Typography
              variant="h6"
              fontWeight="bold"
              className={styles.productName}
              textAlign={"left"}
            >
              {product.name}
            </Typography>
          </Tooltip>
          <Typography variant="body1" textAlign={"left"}>
            ₹{product.price}
          </Typography>
       
          {/* Cart Button INSIDE Link but prevents navigation */}
          <IconButton
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              marginTop: "10px",
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon sx={{ color: "#F36E0D" }} />
          </IconButton>
        </CardContent>
      </Link>

      {/* Snackbar for notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Card>
  );
};

export default ProductCard;