import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { AuthProvider } from './store/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loader from './components/Loader/Loader';
import HomePages from './Pages/HomePages/HomePages';
import Products from './Pages/Products/Products';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Blog from './Pages/Blog/Blog';
import NotFound from './Pages/NotFound/NotFound';
import ProductDetail from './Pages/ProductsDetails/ProductsDetails';
import Cart from './Pages/Cart/Cart';
import Favorite from './Pages/Favorite/Favorite';
import Categories from './Pages/Categories/Categories';
import Checkout from './Pages/Checkout/Checkout';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import OrderSuccess from './Pages/OrderSuccess/OrderSuccess';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import OfflineNotice from './components/OfflineNotice/OfflineNotice';
import { CartProvider } from './store/CartContext';
import { FavoritesProvider } from './store/FavoritesContext';
import ProductsDetails from './Pages/ProductsDetails/ProductsDetails';
import { useSelector } from 'react-redux';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="app">
          {loading && <Loader />}
          {!loading && (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Navbar />
              <ScrollToTop />
              <OfflineNotice />
              <Routes>
                {/* Public Routes */}
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? 
                    <HomePages /> : 
                    <Login />
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    isAuthenticated ? 
                    <HomePages /> : 
                    <Signup />
                  } 
                />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <HomePages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Products products={products} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorite"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Favorite />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AboutUs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ContactUs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Blog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Profile user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ProductsDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <OrderSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          )}
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;