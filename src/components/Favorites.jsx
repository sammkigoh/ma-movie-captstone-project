import React, { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
	const { favorites, removeFavorite, fetchMovieById } =
		useContext(FavoritesContext);
	const navigate = useNavigate();

	const handleRemoveFavorite = (id) => {
		removeFavorite(id);
	};

	const handleMovieClick = async (imdbId) => {
		console.log("fetching movie with iMdb ID:", imdbId);
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
				{
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${
							import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
						}`,
					},
				}
			);

			if (response.data.movie_results.length > 0) {
				const movie = response.data.movie_results[0];
				navigate(`/search-movies/${movie.id}`);
			} else {
				console.error("Movie not found");
			}
		} catch (error) {
			console.error("Error fetching movie by ID:", error);
		}
	};

	console.log("logging favorites", favorites);
	return (
		<div className="p-4 text-white">
			<h1 className="text-2xl text-white font-bold mb-4">
				My Favorite Movies
			</h1>
			{favorites ? (
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					{favorites.map((movie) => (
						<div
							key={movie.id}
							className="bg-transparent rounded-lg flex flex-col"
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${
									movie.poster_path ||
									"https://placehold.co/600x400/png"
								}`}
								alt={movie.title}
								className="w-full h-90 rounded-t-lg object-cover"
								onClick={() => handleMovieClick(movie.imdb_id)}
							/>
							<h3 className="text-center text-sm mt-2 truncate">
								{movie.title}
							</h3>
							<button
								onClick={() => handleRemoveFavorite(movie.id)}
								className=" bg-sky-900 text-red-500 font-bold text-center mt-2"
							>
								Remove from Favorites
							</button>
						</div>
					))}
				</div>
			) : (
				<div className="text-white text-center">
					No favorite movies found.
				</div>
			)}
		</div>
	);
};
export default Favorites;
