// src/contexts/MovieContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage (safe, only on client-side)
  useEffect(() => {
    if (typeof window !== "undefined") { // ensure code runs only in browser
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        try {
          const parsed = JSON.parse(storedFavs);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          } else {
            console.warn("Favorites in localStorage was not an array. Resetting.");
            localStorage.removeItem("favorites");
            setFavorites([]);
          }
        } catch (err) {
          console.error("Failed to parse favorites from localStorage:", err);
          localStorage.removeItem("favorites");
          setFavorites([]);
        }
      }
    }
  }, []);

  // Save favorites to localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (err) {
        console.error("Failed to save favorites to localStorage:", err);
      }
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!movie) return;
    setFavorites((prev) => {
      if (movie.id !== undefined && prev.some((m) => m.id === movie.id)) {
        return prev; // already in favorites
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};
