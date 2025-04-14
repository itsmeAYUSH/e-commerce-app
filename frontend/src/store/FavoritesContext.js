import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const FavoritesContext = createContext();

// Initial state - load from localStorage if available
const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

// Reducer function
const favoritesReducer = (state, action) => {
  let updatedFavorites;

  switch (action.type) {
    case "ADD_FAVORITE":
      // Prevent duplicates
      if (state.favorites.some((item) => item._id === action.payload._id)) {
        return state; // Return unchanged state if product is already in favorites
      }
      updatedFavorites = {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites.favorites)
      );
      return updatedFavorites;

    case "REMOVE_FAVORITE":
      updatedFavorites = {
        ...state,
        favorites: state.favorites.filter(
          (item) => item._id !== action.payload._id
        ),
      };
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites.favorites)
      );
      return updatedFavorites;

    case "CLEAR_FAVORITES":
      localStorage.removeItem("favorites");
      return { ...state, favorites: [] };

    default:
      return state;
  }
};

// Favorites Provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  const addFavorite = (item) => {
    dispatch({ type: "ADD_FAVORITE", payload: item });
  };

  const removeFavorite = (item) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: item });
  };

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  return (
    <FavoritesContext.Provider
      value={{
        state,
        addFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the Favorites Context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
