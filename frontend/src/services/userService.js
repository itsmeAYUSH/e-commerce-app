import axios from 'axios';

const API_URL = 'https://e-commerce-app-p1sv.onrender.com/api/user';

// Create axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000 // 10 second timeout
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      details: error.response?.data?.details
    });

    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please login again.'));
    }

    // Handle server errors
    if (error.response?.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    return Promise.reject(error);
  }
);

// Favorites
export const getFavorites = async () => {
  try {
    const response = await axiosInstance.get('/favorites');
    return response.data.favorites;
  } catch (error) {
    console.error('Get favorites error:', error);
    throw error;
  }
};

export const toggleFavorite = async (productId) => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    const response = await axiosInstance.post(`/favorites/${productId}`);
    return response.data.favorites;
  } catch (error) {
    console.error('Toggle favorite error:', error);
    throw error;
  }
};

// Cart
export const getCart = async () => {
  try {
    const response = await axiosInstance.get('/cart');
    return response.data.cart;
  } catch (error) {
    console.error('Get cart error:', error);
    throw error;
  }
};

export const updateCart = async (productId, quantity) => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    const response = await axiosInstance.post('/cart', { productId, quantity });
    return response.data.cart;
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
};

// Bulk clear cart
export const clearCartBulk = async () => {
  try {
    const response = await axiosInstance.post('/cart/clear');
    return response.data.cart;
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
};

// Shipping Addresses
export const getShippingAddresses = async () => {
  try {
    const response = await axiosInstance.get('/shipping-address');
    return response.data.addresses;
  } catch (error) {
    console.error('Get addresses error:', error);
    throw error;
  }
};

export const addShippingAddress = async (address) => {
  try {
    if (!address) {
      throw new Error('Address is required');
    }
    const response = await axiosInstance.post('/shipping-address', address);
    return response.data.addresses;
  } catch (error) {
    console.error('Add address error:', error);
    throw error;
  }
};

export const updateShippingAddress = async (addressId, address) => {
  try {
    if (!addressId || !address) {
      throw new Error('Address ID and updated address are required');
    }
    const response = await axiosInstance.put(`/shipping-address/${addressId}`, address);
    return response.data.addresses;
  } catch (error) {
    console.error('Update address error:', error);
    throw error;
  }
};

export const deleteShippingAddress = async (addressId) => {
  try {
    if (!addressId) {
      throw new Error('Address ID is required');
    }
    const response = await axiosInstance.delete(`/shipping-address/${addressId}`);
    return response.data.addresses;
  } catch (error) {
    console.error('Delete address error:', error);
    throw error;
  }
}; 