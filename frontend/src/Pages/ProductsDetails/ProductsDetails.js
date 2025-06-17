import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Snackbar,
  CircularProgress,
  Box
} from "@mui/material";
import styles from "./ProductsDetails.module.css";
import WestIcon from "@mui/icons-material/West";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Product not found');
        }

        setProduct(result.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const price = typeof product.price === 'string' 
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
    setSnackbarOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button 
          className={styles.backLink} 
          onClick={() => navigate("/products")}
          startIcon={<WestIcon />}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <Typography variant="h6">Product not found.</Typography>
        <Button 
          className={styles.backLink} 
          onClick={() => navigate("/products")}
          startIcon={<WestIcon />}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  // Calculate savings if originalPrice exists
  const originalPrice = product.originalPrice 
    ? parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, "")) 
    : null;
  const price = parseFloat(String(product.price).replace(/[^0-9.]/g, ""));
  const savings = originalPrice ? originalPrice - price : 0;

  return (
    <div>
      <div className={styles.prodDetailsHeader}>
        <h2>Products/Product Details</h2>
      </div>
      <div className={styles.container}>
        <Button 
          className={styles.backLink} 
          onClick={() => navigate("/products")}
          startIcon={<WestIcon />}
        >
          Back to Products
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                
                {product.discount && (
                  <Typography variant="subtitle1" color="error">
                    {product.discount} OFF
                  </Typography>
                )}
                
                {savings > 0 && (
                  <Typography variant="h6" color="error">
                    Saved ₹{savings.toFixed(2)}
                  </Typography>
                )}
                
                <Typography variant="h5">₹{price.toFixed(2)}</Typography>
                
                {originalPrice && originalPrice > price && (
                  <Typography variant="body1" style={{ textDecoration: "line-through" }}>
                    ₹{originalPrice.toFixed(2)}
                  </Typography>
                )}
                
                {product.code && (
                  <Typography variant="body1">
                    Product Code: {product.code}
                  </Typography>
                )}
                
                <Typography variant="body1">
                  In Stock: {product.inStock ? "Yes" : "No"}
                </Typography>
                
                {product.color && (
                  <Typography variant="body1">
                    Color: {product.color}
                  </Typography>
                )}
                
                {product.category && (
                  <Typography variant="body1">
                    Category: {product.category}
                  </Typography>
                )}
                
                {product.material && (
                  <Typography variant="body1">
                    Material: {product.material}
                  </Typography>
                )}
                
                {product.description && (
                  <Typography variant="body1" style={{ marginTop: "16px" }}>
                    {product.description}
                  </Typography>
                )}
                
                <Button
                  style={{ marginTop: "16px" }}
                  className={styles.buyNowBtn}
                >
                  Buy Now
                </Button>
                
                <Button
                  style={{ marginLeft: "8px", marginTop: "16px" }}
                  className={styles.addCartBtn}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Collection />
      <Footer />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Added to cart!"
      />
    </div>
  );
};

export default ProductDetail;