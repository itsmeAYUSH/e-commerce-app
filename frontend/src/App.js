import "./App.css";
import Collection from "./components/Collection/Collection";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import FeaturedCategories from "./components/FeaturedCategories/FeaturedCategories";
import Trending from "./components/Trending/Trending";
import TestimonialSection from "./components/TestimonialsSection/TestimonialSection";
import Footer from "./components/Footer/Footer";
import QuestionAnswer from "./components/QuestionAnswer/QuestionAnswer";
import NewsLetter from "./components/NewsLetter/NewsLetter";
import { Routes, Route, NavLink } from "react-router-dom";
import Products from "./Pages/Products/Products";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import LatestBlog from "./components/Blog/LatestBlog";
import NotFound from "./Pages/NotFound/NotFound";
import Blog from "./Pages/Blog/Blog";
import OfflineNotice from "./components/OfflineNotice/OfflineNotice";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProductDetail from "./Pages/ProductsDetails/ProductsDetails";
import Cart from "./Pages/Cart/Cart";
import Favorite from "./Pages/Favorite/Favorite";
import Categories from "./Pages/Categories/Categories";
import Checkout from "./Pages/Checkout/Checkout";
// import { products } from "./util/data";
import { useState, useEffect, act } from "react";
import Loader from "./components/Loader/Loader";
// import Errors from "./components/Errors/Errors";
const HomePages = () => {
  return (
    <div>
      <OfflineNotice />
      <Homepage />
      <Collection />
      <FeaturedCategories />
      <Trending />
      <TestimonialSection />
      <LatestBlog />
      <QuestionAnswer />
      <NewsLetter />
      <Footer />
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Nova Nest Chair", price: 180.99, quantity: 1 },
    { name: "Luna Luxe Chair", price: 129.99, quantity: 2 },
    { name: "Arm Serenade Chair", price: 333.99, quantity: 1 },
  ]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <Header />
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/products" element={<Products />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}
            />
            <Route
              path="cart"
              element={
                <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
