import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = (state, action) => {
  let updatedCart;
  switch (action.type) {
    case "ADD_ITEM":
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        // Item exists, don't add again (snackbar will be shown by the provider)
        return state;
      }
      updatedCart = { ...state, items: [...state.items, action.payload] };
      localStorage.setItem("cart", JSON.stringify(updatedCart.items));
      return updatedCart;

    case "UPDATE_ITEM":
      updatedCart = {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        )
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart.items));
      return updatedCart;

    case "REMOVE_ITEM":
      updatedCart = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart.items));
      return updatedCart;

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      setSnackbar({
        open: true,
        message: "This product is already in your cart!",
        severity: "info"
      });
      return false;
    }
    dispatch({ type: "ADD_ITEM", payload: item });
    setSnackbar({
      open: true,
      message: "Product added to cart!",
      severity: "success"
    });
    return true;
  };

  const updateItem = (item) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
    setSnackbar({
      open: true,
      message: "Product removed from cart!",
      severity: "success"
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      addItem, 
      updateItem, 
      removeItem, 
      clearCart 
    }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};