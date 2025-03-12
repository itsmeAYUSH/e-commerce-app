// ProductCard.js
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
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
  const [favorite, setFavorite] = useState(false);

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
      <DiscountBadge>{product.discount}</DiscountBadge>
      <WishlistButton
        onClick={() => setFavorite(!favorite)}
        isFavorite={favorite}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          <Typography variant="h6" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="body1">{product.price}</Typography>
          <IconButton
            sx={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              marginTop: "10px",
            }}
          >
            <ShoppingCartIcon sx={{ color: "#F36E0D" }} />
          </IconButton>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
