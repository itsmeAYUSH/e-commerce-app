import React, { createContext, useContext, useReducer } from "react";

// Create context
const FavoritesContext = createContext();

// Initial state
const initialState = {
  favorites: [],
};

// Reducer function
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      // Prevent duplicates
      if (state.favorites.some((item) => item._id === action.payload._id)) {
        return state; // Return unchanged state if product is already in favorites
      }
      return { ...state, favorites: [...state.favorites, action.payload] };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

// Favorites Provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = (item) => {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  };

  const removeFavorite = (item) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: item });
  };

  return (
    <FavoritesContext.Provider value={{ state, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the Favorites Context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
