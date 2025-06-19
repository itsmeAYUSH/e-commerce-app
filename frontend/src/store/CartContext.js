import { createContext, useContext, useReducer, useEffect } from "react";
import { getCart, updateCart, clearCartBulk } from "../services/userService";
import { useSnackbar } from "../contexts/SnackbarContext";

const CartContext = createContext();

const initialState = {
  items: [],
  loading: false,
  error: null
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };

    case "SET_CART":
      return {
        ...state,
        loading: false,
        items: action.payload || [], // Ensure we always have an array
        error: null
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: state.items // Keep existing items on error
      };

    case "CLEAR_CART":
      return {
        ...state,
        loading: false,
        items: [],
        error: null
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { showSnackbar } = useSnackbar();

  // Load cart when component mounts and when auth token changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadCart();
    } else {
      dispatch({ type: "SET_CART", payload: [] });
    }
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      const cart = await getCart();
      if (!Array.isArray(cart)) {
        throw new Error('Invalid cart data received');
      }
      dispatch({ type: "SET_CART", payload: cart });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to load cart"
      });
      showSnackbar(error.message || "Failed to load cart", "error");
    }
  };

  const addItem = async (product) => {
    if (!product || !product._id) {
      showSnackbar("Invalid product data", "error");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });
      const cart = await updateCart(product._id, 1);
      if (!Array.isArray(cart)) {
        throw new Error('Invalid response from server');
      }
      dispatch({ type: "SET_CART", payload: cart });
      showSnackbar("Added to cart", "success");
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to add item to cart"
      });
      showSnackbar(error.message || "Failed to add item to cart", "error");
    }
  };

  const removeItem = async (product) => {
    if (!product || !product._id) {
      showSnackbar("Invalid product data", "error");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });
      const cart = await updateCart(product._id, 0); // 0 quantity removes the item
      if (!Array.isArray(cart)) {
        throw new Error('Invalid response from server');
      }
      dispatch({ type: "SET_CART", payload: cart });
      showSnackbar("Removed from cart", "success");
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to remove item from cart"
      });
      showSnackbar(error.message || "Failed to remove item from cart", "error");
    }
  };

  const updateItem = async (product, quantity) => {
    if (!product || !product._id) {
      showSnackbar("Invalid product data", "error");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });
      const cart = await updateCart(product._id, quantity);
      if (!Array.isArray(cart)) {
        throw new Error('Invalid response from server');
      }
      dispatch({ type: "SET_CART", payload: cart });
      showSnackbar("Cart updated", "success");
    } catch (error) {
      console.error('Error updating cart:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to update cart"
      });
      showSnackbar(error.message || "Failed to update cart", "error");
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      await clearCartBulk();
      dispatch({ type: "CLEAR_CART" });
      showSnackbar("Cart cleared", "success");
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to clear cart"
      });
      showSnackbar(error.message || "Failed to clear cart", "error");
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items || [], // Ensure we always provide an array
        loading: state.loading,
        error: state.error,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        reloadCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};