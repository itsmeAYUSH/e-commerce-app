import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSelector } from 'react-redux';
import { getFavorites, toggleFavorite } from "../services/userService";
import { useSnackbar } from "../contexts/SnackbarContext";

const FavoritesContext = createContext();

const initialState = {
  favorites: [],
  loading: false,
  error: null
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
      
    case "SET_FAVORITES":
      return {
        ...state,
        loading: false,
        favorites: action.payload || [], // Ensure we always have an array
        error: null
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        favorites: state.favorites // Keep existing favorites on error
      };

    case "OPTIMISTIC_TOGGLE":
      return {
        ...state,
        favorites: action.payload,
        loading: true,
        error: null
      };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);
  const { showSnackbar } = useSnackbar();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      loadFavorites();
    } else {
      dispatch({ type: "SET_FAVORITES", payload: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadFavorites = async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      const favorites = await getFavorites();
      if (!Array.isArray(favorites)) {
        throw new Error('Invalid favorites data received');
      }
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    } catch (error) {
      console.error('Error loading favorites:', error);
      dispatch({ 
        type: "SET_ERROR", 
        payload: error.message || "Failed to load favorites" 
      });
      showSnackbar(error.message || "Failed to load favorites", "error");
    }
  };

  const handleToggleFavorite = async (product) => {
    if (!product || !product._id) {
      showSnackbar("Invalid product data", "error");
      return;
    }

    const isCurrentlyFavorite = state.favorites.some(fav => fav._id === product._id);
    const originalFavorites = [...state.favorites];
    
    try {
      // Optimistic update
      dispatch({
        type: "OPTIMISTIC_TOGGLE",
        payload: isCurrentlyFavorite
          ? state.favorites.filter(fav => fav._id !== product._id)
          : [...state.favorites, product]
      });

      // Actual API call
      const updatedFavorites = await toggleFavorite(product._id);
      
      if (!Array.isArray(updatedFavorites)) {
        throw new Error('Invalid response from server');
      }

      // Sync with server response
      dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
      
      showSnackbar(
        isCurrentlyFavorite ? "Removed from favorites" : "Added to favorites",
        "success"
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert optimistic update
      dispatch({ type: "SET_FAVORITES", payload: originalFavorites });
      
      // Show error message
      const errorMessage = error.message === 'Server error. Please try again later.'
        ? error.message
        : isCurrentlyFavorite 
          ? "Failed to remove from favorites" 
          : "Failed to add to favorites";
      
      showSnackbar(errorMessage, "error");
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        loading: state.loading,
        error: state.error,
        toggleFavorite: handleToggleFavorite,
        reloadFavorites: loadFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};