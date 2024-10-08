import axios from "axios";
import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	const addFavorite = (movie) => {
		localStorage.setItem(
			"favorites",
			JSON.stringify([...favorites, movie])
		);
		const storedFavorites = localStorage.getItem("favorites");
		const data = JSON.parse(storedFavorites);
		setFavorites(data);
	};

	const removeFavorite = (id) => {
		setFavorites((prev) => prev.filter((movie) => movie.id !== id));
	};

	const fetchMovieById = async (imbdId) => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/find/${imdbId}?api_key=${
					import.meta.env.VITE_REACT_APP_API_KEY
				}&external_source=imdb_id`
			);
			return response.data;
		} catch (error) {
			console.error("Errpr fetching movie by ID:", error);
		}
	};
	console.log("context favorites", favorites);
	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite, fetchMovieById }}
		>
			{children}
		</FavoritesContext.Provider>
	);
};
