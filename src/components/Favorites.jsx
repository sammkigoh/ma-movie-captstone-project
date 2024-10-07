import React, { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
	const { favorites, removeFavorite } = useContext(FavoritesContext);
	const navigate = useNavigate();
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			if (favorites.length > 0) {
				try {
					console.log(favorites); //to debugg
					const movieRequests = favorites.map((favorite) =>
						axios.get(
							`${import.meta.env.VITE_REACT_APP_API_URL}movie/${
								favorite.id
							}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`
						)
					);
					const responses = await Promise.all(movieRequests);
					setFavoriteMovies(responses.map((res) => res.data));
				} catch (error) {
					console.error("Error fetching favorite movies:", error);
				}
			}
		};
		fetchFavoriteMovies();
	}, [favorites]);

	const handleRemoveFavorite = (id) => {
		removeFavorite(id);
	};

	const handleMovieClick = (id) => {
		navigate(`/movies/${id}`);
	};

	return (
		<div className="p-4 text-white">
			<h1 className="text-2xl text-white font-bold mb-4">
				My Favorite Movies
			</h1>
			{favorites.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					{favoriteMovies.map((movie) => (
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
								onClick={() => handleMovieClick(movie.id)}
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
