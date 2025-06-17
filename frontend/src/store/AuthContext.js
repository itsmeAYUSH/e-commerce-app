import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        try {
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          
          // Verify token with backend
          const response = await axios.get('/api/auth/verify');
          
          if (response.data.success && response.data.valid) {
            const userData = response.data.user;
            setToken(savedToken);
            setUser(userData);
            setIsAuthenticated(true);
            // Update localStorage with fresh user data
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            // Clear invalid data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        // No saved token or user
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login user
  const login = async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response format');
      }
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      
      // Navigate to homepage after successful login
      navigate('/', { replace: true });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      // Clear any existing auth data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: errorMessage };
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const response = await axios.post('/api/auth/signup', formData);
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response format');
      }
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      
      // Navigate to homepage after successful signup
      navigate('/', { replace: true });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      // Clear any existing auth data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Update user data
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};