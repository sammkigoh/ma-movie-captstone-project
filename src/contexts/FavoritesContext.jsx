import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	const addFavorite = (movie) => {
		setFavorites((prev) => [...prev, movie]);
	};

	const removeFavorite = (id) => {
		setFavorites((prev) => prev.filter((movie) => movie.id !== id));
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};
