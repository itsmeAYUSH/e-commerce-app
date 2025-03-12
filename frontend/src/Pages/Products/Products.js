import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";

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

// export const ProductCard = ({ product }) => {
//   const [favorite, setFavorite] = useState(false);

//   return (
//     <Card
//       sx={{
//         position: "relative",
//         borderRadius: "15px",
//         overflow: "hidden",
//         boxShadow: 3,
//         cursor: "pointer",
//       }}
//     >
//       <DiscountBadge>{product.discount}</DiscountBadge>
//       <WishlistButton
//         onClick={() => setFavorite(!favorite)}
//         isFavorite={favorite}
//       >
//         {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//       </WishlistButton>
//       <Link
//         to={`/product/${product._id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         <CardMedia
//           component="img"
//           height="180"
//           image={product.image}
//           alt={product.name}
//         />
//         <CardContent
//           sx={{
//             backgroundColor: "#2d5356",
//             color: "#FEFCE6",
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold">
//             {product.name}
//           </Typography>
//           <Typography variant="body1">{product.price}</Typography>
//           <IconButton
//             sx={{
//               backgroundColor: "#fff",
//               borderRadius: "50%",
//               marginTop: "10px",
//             }}
//           >
//             <ShoppingCartIcon sx={{ color: "#F36E0D" }} />
//           </IconButton>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// };

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

  useEffect(() => {
    const fetchProducts = async () => {
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  const clearFilters = () => {
    setPriceRange([50, 300]);
    setSelectedColors([]);
    setAvailability("");
    setSelectedCategory("");
    setSelectedMaterial("");
  };
  const filteredProducts = products.filter((product) => {
    // Check if product.price is defined and is a string
    const price = product.price
      ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
      : 0; // Default to 0 if price is undefined
    const isInPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const isColorMatch =
      selectedColors.length === 0 || selectedColors.includes(product.color);
    const isAvailabilityMatch =
      !availability ||
      (availability === "inStock" && product.inStock) ||
      (availability === "outOfStock" && !product.inStock);
    const isCategoryMatch =
      !selectedCategory || product.category === selectedCategory;
    const isMaterialMatch =
      !selectedMaterial || product.material === selectedMaterial;

    return (
      isInPriceRange &&
      isColorMatch &&
      isAvailabilityMatch &&
      isCategoryMatch &&
      isMaterialMatch
    );
  });

  // Sort products based on selected criteria
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

  if (loading) {
    // <LinearProgress/>
    // setLoading = true;
  }
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <div>
      <div className={styles.contactHeader}>
        <h2>Products</h2>
      </div>
      <Loader />
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
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={handleCategoryChange}
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
                        type="radio"
                        name="material"
                        value={material}
                        checked={selectedMaterial === material}
                        onChange={handleMaterialChange}
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
          <Button variant="outlined" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
        {/* Display Products */}
        <Container>
          <div className={styles.productHead}>
            <h2>
              Showing {sortedProducts.length} of {products.length} Products.
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
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
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
        </Container>
      </div>
    </div>
  );
};

export default Products;
