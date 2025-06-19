import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material"; // Import Badge from MUI
import { useCart } from "../../store/CartContext"; // Import the useCart hook
import { useFavorites } from "../../store/FavoritesContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navRef = useRef(null);
  
  // Get favorites and cart items from contexts
  const { favorites } = useFavorites();
  const { items } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const processedData = data.data.map((product) => ({
          ...product,
          parsedPrice: typeof product.price === 'string' 
            ? parseFloat(product.price.replace(/[^0-9.]/g, "")) 
            : Number(product.price),
          displayPrice: typeof product.price === 'string' 
            ? `₹${product.price.replace(/[^0-9.]/g, "")}`
            : `₹${product.price}`
        }));

        setAllProducts(processedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setSuggestions(filteredProducts.slice(0, 8));
  }, [searchQuery, allProducts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }

      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
      setSuggestions([]);
      setMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setSuggestions([]);
    setShowSearch(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (showSearch) {
      setShowSearch(false);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.Navbar} ref={navRef}>
      <div className={styles.HeaderLogo} onClick={() => navigate("/")}>
        <h2>
          Furni<span>Flex</span>.
        </h2>
      </div>

      {/* Mobile Menu Toggle */}
      <div className={styles.mobileMenuToggle}>
        {mobileMenuOpen ? (
          <CloseIcon onClick={toggleMobileMenu} className={styles.menuIcon} />
        ) : (
          <MenuIcon onClick={toggleMobileMenu} className={styles.menuIcon} />
        )}
      </div>

      {/* Navigation Links */}
      <div
        className={`${styles.navLinks} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <Link to="/" className={styles.link} onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link to="/products" className={styles.link} onClick={toggleMobileMenu}>
          Products
        </Link>
        <Link
          to="/categories"
          className={styles.link}
          onClick={toggleMobileMenu}
        >
          Categories
        </Link>
        <Link to="/about" className={styles.link} onClick={toggleMobileMenu}>
          About Us
        </Link>
        <Link to="/contact" className={styles.link} onClick={toggleMobileMenu}>
          Contact Us
        </Link>
        <Link to="/blog" className={styles.link} onClick={toggleMobileMenu}>
          Blog
        </Link>
      </div>

      {/* Icons */}
      <div
        className={`${styles.icons} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        {showSearch ? (
          <div className={styles.searchContainer} ref={searchRef}>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <SearchRoundedIcon />
              </button>
              <CloseIcon className={styles.icon} onClick={handleSearchToggle} />
            </form>

            {suggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {suggestions.map((product) => (
                  <li
                    key={product._id || product.id}
                    className={styles.suggestionItem}
                    onClick={() =>
                      handleSuggestionClick(product._id || product.id)
                    }
                  >
                    <div className={styles.suggestionContent}>
                      <span className={styles.productName}>{product.name}</span>
                      <span className={styles.productCategory}>
                        {product.category || 'Uncategorized'}
                      </span>
                    </div>
                    <span className={styles.productPrice}>
                      {product.displayPrice}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {searchQuery && suggestions.length === 0 && !loading && (
              <div className={styles.noResults}>No products found</div>
            )}

            {loading && searchQuery && (
              <div className={styles.loadingResults}>Searching...</div>
            )}
          </div>
        ) : (
          <SearchRoundedIcon
            className={styles.icon}
            onClick={handleSearchToggle}
          />
        )}
        <Badge
          badgeContent={favorites?.length || 0}
          color="error"
          max={99}
          overlap="circular"
          className={styles.badge}
        >
          <FavoriteRoundedIcon
            className={styles.icon}
            onClick={() => handleNavigation("/favorite")}
          />
        </Badge>
        <Badge
          badgeContent={items?.length || 0}
          color="error"
          max={99}
          overlap="circular"
          className={styles.badge}
        >
          <LocalMallRoundedIcon
            className={styles.icon}
            onClick={() => handleNavigation("/cart")}
          />
        </Badge>
        <AccountCircleRoundedIcon
          className={styles.icon}
          onClick={() => handleNavigation("/profile")}
        />
      </div>
    </div>
  );
};

export default Navbar;
