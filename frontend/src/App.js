import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './store/AuthContext';
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

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = (token, userData) => {
    console.log('Login successful in App:', { token, userData });
    
    if (token) {
      localStorage.setItem('token', token);
    }
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);  // Add this line
    }
  };
  const ProtectedRouteWrapper = ({ children }) => (
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      {children}
    </ProtectedRoute>
  );

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Restored user session:', userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

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
    setUser(null);
  };

  return (
    <AuthProvider>
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
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <HomePages />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute>
                        <Products products={products} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorite"
                    element={
                      <ProtectedRoute>
                        <Favorite />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <AboutUs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <ProtectedRoute>
                        <ContactUs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <ProtectedRoute>
                        <Blog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <ProtectedRoute>
                        <Categories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile user={user} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProtectedRoute>
                        <ProductsDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-success"
                    element={
                      <ProtectedRoute>
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
    </AuthProvider>
  );
};

export default App;