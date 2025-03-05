import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state.product; // Get the product from the state

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      <Typography variant="h6" gutterBottom>
        Price: {product.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Original Price: {product.originalPrice}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Discount: {product.discount}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Material: {product.material}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Color: {product.color}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Category: {product.category}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Availability: {product.inStock ? "In Stock" : "Out of Stock"}
      </Typography>
      <Button variant="contained" color="primary">
        Add to Cart
      </Button>
    </Container>
  );
};

export default ProductDetails;
