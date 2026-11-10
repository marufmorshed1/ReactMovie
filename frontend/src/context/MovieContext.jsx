import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavorites = localStorage.getItem("favorites");
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error("Failed to parse favorites from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage:", error);
        }
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((m) => m.id === movie.id)) return prevFavorites;
            return [...prevFavorites, movie];
        });
    };

    const removeFavorite = (movieId) => {
        setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
