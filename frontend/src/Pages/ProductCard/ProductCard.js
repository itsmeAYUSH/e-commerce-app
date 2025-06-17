import React, { useState } from "react";
import { useFavorites } from "../../store/FavoritesContext";
import { useCart } from "../../store/CartContext";
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
import { Link, useNavigate } from "react-router-dom";
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

const ProductCard = ({ product }) => {
  const { state, addFavorite, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isFavorite = state.favorites.some((fav) => fav._id === product._id);

  const handleFavoriteToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

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

    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
        : Number(product.price);

    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: price || 0,
      quantity: 1,
      image: product.image,
    };

    addItem(itemToAdd);
    setSnackbarMessage("Added to cart!");
    setSnackbarOpen(true);
  };

  const handleCardClick = (event) => {
    // Only navigate if the click wasn't on the favorite or cart buttons
    if (!event.target.closest('button')) {
      navigate(`/product/${product._id}`);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: 3,
          cursor: "pointer",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
            transition: "all 0.2s ease-in-out"
          }
        }}
        onClick={handleCardClick}
      >
        {product.discount && <DiscountBadge>{product.discount}</DiscountBadge>}

        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            color: isFavorite ? "#F36E0D" : "#B0B0B0",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "#f5f5f5"
            }
          }}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "cover"
          }}
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
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
          
          <Typography variant="body1" textAlign={"left"}>
            ₹{product.price}
          </Typography>

          <IconButton
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#f5f5f5"
              }
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon sx={{ color: "#F36E0D" }} />
          </IconButton>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />
    </>
  );
};

export default ProductCard;