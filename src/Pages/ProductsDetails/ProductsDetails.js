import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import styles from "./ProductsDetails.module.css";
import WestIcon from "@mui/icons-material/West";
import Footer from "../../components/Footer/Footer";
import Collection from "../../components/Collection/Collection";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  // Remove dollar sign and parse to float
  const originalPrice = parseFloat(product.originalPrice.replace(/[$,]/g, ""));
  const price = parseFloat(product.price.replace(/[$,]/g, ""));
  const savings = originalPrice - price;

  return (
    <div>
      {/* Product Details Header */}
      <div className={styles.prodDetailsHeader}>
        <h2>Products/Product Details</h2>
      </div>
      <div className={styles.container}>
        <Button className={styles.backLink}>
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
                    Saved ${savings.toFixed(2)}
                  </Typography>
                ) : (
                  <Typography variant="h6" color="error">
                    No savings available
                  </Typography>
                )}
                <Typography variant="h5">${price.toFixed(2)}</Typography>
                <Typography
                  variant="body1"
                  style={{ textDecoration: "line-through" }}
                >
                  ${originalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Product Code: {product.code}
                </Typography>
                <Typography variant="body1">
                  In Stock: {product.inStock ? "Yes" : "No"}
                </Typography>
                <Button
                  // variant="outlined"
                  style={{ marginTop: "16px" }}
                  className={styles.buyNowBtn}
                >
                  Buy Now
                </Button>
                <Button
                  // variant="contained"
                  // color="primary"
                  style={{ marginLeft: "8px", marginTop: "16px" }}
                  className={styles.addCartBtn}
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
    </div>
  );
};

export default ProductDetail;
