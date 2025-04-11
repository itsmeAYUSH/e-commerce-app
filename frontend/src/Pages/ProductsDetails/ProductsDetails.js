import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";
import styles from "./ProductsDetails.module.css";
import WestIcon from "@mui/icons-material/West";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";

const ProductDetail = ({ products }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem } = useCart(); // Get the addItem function from context

  const product = products.find((p) => p._id === id);

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  // Parse to float
  const originalPrice = parseFloat(product.originalPrice.replace(/[$,]/g, ""));
  const price = parseFloat(product.price.replace(/[$,]/g, ""));
  const savings = originalPrice - price;


  const backToProductBtnHandler = () => {
    navigate("/products");
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: price,
      quantity: 1, 
      // image: product.image, 
    };
    addItem(itemToAdd); 
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* Product Details Header */}
      <div className={styles.prodDetailsHeader}>
        <h2>Products/Product Details</h2>
      </div>
      <div className={styles.container}>
        <Button className={styles.backLink} onClick={backToProductBtnHandler}>
          <WestIcon />
          Back to product
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                {savings > 0 ? (
                  <Typography variant="h6" color="error">
                    Saved ₹{savings.toFixed(2)}
                  </Typography>
                ) : (
                  <Typography variant="h6" color="error">
                    No savings available
                  </Typography>
                )}
                <Typography variant="h5">₹{price.toFixed(2)}</Typography>
                <Typography
                  variant="body1"
                  style={{ textDecoration: "line-through" }}
                >
                  ₹{originalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Product Code: {product.code}
                </Typography>
                <Typography variant="body1">
                  In Stock: {product.inStock ? "Yes" : "No"}
                </Typography>
                <Button
                  style={{ marginTop: "16px" }}
                  className={styles.buyNowBtn}
                >
                  Buy Now
                </Button>
                <Button
                  style={{ marginLeft: "8px", marginTop: "16px" }}
                  className={styles.addCartBtn}
                  onClick={handleAddToCart} // Add to cart functionality
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Collection />
      <Footer />

      {/* Snackbar for notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Added to cart!"
      />
    </div>
  );
};

export default ProductDetail;
