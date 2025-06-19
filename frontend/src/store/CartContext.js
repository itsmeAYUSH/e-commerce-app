import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";

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
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      // Item exists, don't add again (snackbar will be shown by the provider)
      return;
    }
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const updateItem = (item) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);