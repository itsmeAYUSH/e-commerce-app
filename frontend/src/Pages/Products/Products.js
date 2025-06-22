import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Button,
  Select,
 
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Products.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([5000, 100000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]); // Changed to array
  const [selectedMaterial, setSelectedMaterial] = useState([]); // Changed to array
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // State for mobile filter visibility
  const productsPerPage = 12;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Parse prices once when data is loaded
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        
        // Check if the response has the expected structure
        if (!result.success) {
          throw new Error(result.error || "Failed to fetch products");
        }

        // Ensure we have an array of products
        const productsData = Array.isArray(result.data) ? result.data : [];
        
        // Parse prices once and consistently
        const processedData = productsData.map((product) => ({
          ...product,
          // Store both original price string and parsed numeric value
          parsedPrice: parseFloat(String(product.price).replace(/[^0-9.-]+/g, "")) || 0,
          // Clean price string by removing $ sign
          displayPrice: String(product.price).replace(/[^0-9.]/g, ""),
        }));

        console.log("Processed products:", processedData);
        setProducts(processedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceRange([5000, 100000]);
    setSelectedColors([]);
    setAvailability("");
    setSelectedCategory([]);
    setSelectedMaterial([]);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const isInPriceRange =
      product.parsedPrice >= priceRange[0] &&
      product.parsedPrice <= priceRange[1];

    const isColorMatch =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    const isAvailabilityMatch =
      !availability ||
      (availability === "inStock" && product.inStock) ||
      (availability === "outOfStock" && !product.inStock);

    const isCategoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);

    const isMaterialMatch =
      selectedMaterial.length === 0 ||
      selectedMaterial.includes(product.material);

    return (
      isInPriceRange &&
      isColorMatch &&
      isAvailabilityMatch &&
      isCategoryMatch &&
      isMaterialMatch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === "asc"
      ? a.parsedPrice - b.parsedPrice
      : b.parsedPrice - a.parsedPrice;
  });

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  const toggleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const toggleMaterial = (material) => {
    setSelectedMaterial((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className={styles.contactHeader}>
        <h2>Products</h2>
      </div>
      {loading && <Loader />}
      <div className={styles.productPage}>
        <div className={styles.mobileFilterButton}>
          <Button variant="contained" className={styles.filterButton} onClick={() => setShowFilters(!showFilters)}>
            Filters
          </Button>
        </div>
        <div className={`${styles.filterOptions} ${showFilters ? styles.show : ''}`}>
          <h2>Filter Options</h2>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.radioGroup}>
                {[
                  "Bed Room",
                  "Living Room",
                  "Office",
                  "Kitchen",
                  "Outdoor",
                  "Decor",
                ].map((category) => (
                  <li key={category}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.priceRange}>
                <span>₹{priceRange[0]}</span>
                <Slider
                  className={styles.slider}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  size="small"
                  color="primary"
                  min={5000}
                  max={100000}
                />
                <span>₹{priceRange[1]}</span>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Material</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.radioGroup}>
                {[
                  "Cloth",
                  "Wood",
                  "Upholstered",
                  "Glass",
                  "Plastic",
                  "Rattan",
                ].map((material) => (
                  <li key={material}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedMaterial.includes(material)}
                        onChange={() => toggleMaterial(material)}
                      />
                      {material}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.radioGroup}>
                {["red", "green", "grey", "brown", "white", "blue"].map(
                  (color) => (
                    <li key={color}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColor(color)}
                        />
                        {color}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Availability</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.radioGroup}>
                {["inStock", "outOfStock"].map((status) => (
                  <li key={status}>
                    <label>
                      <input
                        type="radio"
                        name="availability"
                        value={status}
                        checked={availability === status}
                        onChange={handleAvailabilityChange}
                      />
                      {status === "inStock" ? "In Stock" : "Out of Stock"}
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
          <Button
            variant="outlined"
            onClick={clearFilters}
            sx={{ marginBlock: 5 }}
          >
            Clear All Filters
          </Button>
        </div>
        <Container>
          <div className={styles.productHead}>
            <h2>
              Showing {currentProducts.length} of {filteredProducts.length}{" "}
              Products
            </h2>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Grid container spacing={3} justifyContent="start">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={4}>
                  <ProductCard
                    product={{
                      ...product,
                      price: product.displayPrice, // Use the cleaned price string
                    }}
                  />
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", width: "100%" }}
              >
                No products found.
              </Typography>
            )}
          </Grid>
          <Pagination
            className={styles.pagination}
            count={Math.ceil(sortedProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Products;