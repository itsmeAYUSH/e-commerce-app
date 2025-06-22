import React from "react";
import { useFavorites } from "../../store/FavoritesContext";
import { useCart } from "../../store/CartContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useSnackbar } from "../../contexts/SnackbarContext";

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
  const { favorites, toggleFavorite, loading } = useFavorites();
  const { addItem } = useCart();
  const { showSnackbar } = useSnackbar();

  // Defensive: ensure favorites is always an array
  const safeFavorites = Array.isArray(favorites) ? favorites : [];
  const isFavorite = safeFavorites.some((fav) => fav && fav._id === product?._id);

  const handleFavoriteToggle = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (loading) return;
    if (!product || !product._id) {
      showSnackbar("Invalid product data", "error");
      return;
    }
    toggleFavorite(product);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.preventDefault();

    addItem(product);
    showSnackbar(`${product.name} added to cart!`, "success");
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
      <WishlistButton 
        onClick={handleFavoriteToggle} 
        isFavorite={isFavorite}
        disabled={loading}
      >
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
            <span style={{ textDecoration: 'line-through', color: '#b0b0b0', marginRight: 8 }}>
              ₹{product.originalPrice} /-
            </span>
            <span style={{fontWeight: 'bold' }}>
              ₹{product.price} /-
            </span>
          </Typography>
       
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
    </Card>
  );
};

export default ProductCard;