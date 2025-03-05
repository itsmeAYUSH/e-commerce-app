import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Grid,
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
import Button from "@mui/material/Button";
import "./Trending.css";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Bed Room",
  "Living Room",
  "Dining Room",
  "Outdoor",
  "Indoor",
];

const products = [
  {
    id: 1,
    name: "Luxe Lounge Sofa",
    price: "$235.99",
    discount: "-20%",
    category: "Living Room",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
  {
    id: 2,
    name: "Comfort Haven Sofa",
    price: "$250.99",
    discount: "-10%",
    category: "Living Room",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
  {
    id: 3,
    name: "Round Wicker Chair",
    price: "$180.99",
    discount: "-25%",
    category: "Outdoor",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
  {
    id: 4,
    name: "Elegant Dining Table",
    price: "$320.50",
    discount: "-15%",
    category: "Dining Room",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
  {
    id: 5,
    name: "Classic Bed Frame",
    price: "$500.00",
    discount: "-5%",
    category: "Bed Room",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
  {
    id: 6,
    name: "Indoor Swing Chair",
    price: "$199.99",
    discount: "-12%",
    category: "Indoor",
    image:
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg",
  },
];

const DiscountBadge = styled("div")({
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#0D665C",
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
      }}
    >
      <DiscountBadge>{product.discount}</DiscountBadge>
      <WishlistButton
        onClick={() => setFavorite(!favorite)}
        isFavorite={favorite}
      >
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </WishlistButton>
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />
      <CardContent
        sx={{
          backgroundColor: "#0D665C",
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
    </Card>
  );
};

const App = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

      return (
    <React.Fragment>
      <div className="trendingSec">
        <h2>Trending Products for You</h2>
        <Button className="view-all-btn" onClick={() => navigate("/products")}>
          View All Products <EastRoundedIcon />
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
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            />
          ))}
        </Tabs>

        {/* Product Grid */}
        <Grid container spacing={3} justifyContent="start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" width="100%">
              No products available in this category.
            </Typography>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
