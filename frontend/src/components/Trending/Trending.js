import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Grid, Typography, Button } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Pages/ProductCard/ProductCard";
import "./Trending.css";

const categories = [
  "All",
  "Bed Room",
  "Living Room",
  "Dining Room",
  "Outdoor",
  "Indoor",
];

const Trending = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data || data); // Handles both response formats
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Limit to 8 products
  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <React.Fragment>
      <div className="trendingSec">
        <h2>
          Trending Products for You
        </h2>
        <Button 
          className="view-all-btn" 
          onClick={() => navigate("/products")}
          endIcon={<EastRoundedIcon />}
        >
          View All Products
        </Button>
      </div>

      <Container>
        {/* Category Navigation */}
        <Tabs
          value={categories.indexOf(selectedCategory)}
          onChange={(event, newValue) =>
            setSelectedCategory(categories[newValue])
          }
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            marginBottom: "20px",
            fontSize: "18px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#0D665C",
            },
            "& .MuiTab-root": {
              color: "#555",
              fontWeight: "bold",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#0D665C",
            },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category) => (
            <Tab
              key={category}
              label={category}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            />
          ))}
        </Tabs>

        {/* Loading and Error Handling */}
        {loading && (
          <Typography variant="h6" textAlign="center">
            Loading...
          </Typography>
        )}
        {error && (
          <Typography variant="h6" textAlign="center" color="error">
            {error}
          </Typography>
        )}

        {/* Product Grid */}
        <Grid container spacing={3} className="products-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Grid
                item
                key={product._id || product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <ProductCard
                  product={product}
                  isFavorite={product.isFavorite}
                />
              </Grid>
            ))
          ) : (
            !loading && (
              <Typography variant="h6" textAlign="center" width="100%">
                No products available in this category.
              </Typography>
            )
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Trending;