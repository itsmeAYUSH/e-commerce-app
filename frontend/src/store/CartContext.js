import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create a context
const CartContext = createContext();

// Initial state
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  let updatedCart;
  switch (action.type) {
    case "ADD_ITEM":
      updatedCart = { ...state, items: [...state.items, action.payload] };
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

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
