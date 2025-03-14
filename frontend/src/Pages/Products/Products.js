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
  const [priceRange, setPriceRange] = useState([50, 300]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value);
  };

  const clearFilters = () => {
    setPriceRange([50, 300]);
    setSelectedColors([]);
    setAvailability("");
    setSelectedCategory("");
    setSelectedMaterial("");
  };

  const filteredProducts = products.filter((product) => {
    const price = product.price
      ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
      : 0;
    const isInPriceRange = price >= priceRange[0] && price <= priceRange[1];
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
    if (sortOrder === "asc") {
      return (
        parseFloat(a.price.replace(/[^0-9.-]+/g, "")) -
        parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
      );
    } else {
      return (
        parseFloat(b.price.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
      );
    }
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
  };

  const toggleMaterial = (material) => {
    setSelectedMaterial((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
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
        <div className={styles.filterOptions}>
          <h2>Filter Option</h2>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.radioGroup}>
                {[
                  "Bedroom",
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
                <span>${priceRange[0]}</span>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={50}
                  max={300}
                />
                <span>${priceRange[1]}</span>
              </div>
              <Button
                variant="contained"
                onClick={() => console.log("Applying price range:", priceRange)}
              >
                Go
              </Button>
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
              Showing {currentProducts.length} of {products.length} Products.
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
                  <ProductCard product={product} />
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
            // sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
          />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
