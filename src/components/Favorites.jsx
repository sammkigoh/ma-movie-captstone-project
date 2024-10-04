import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);
	const navigate = useNavigate();

	const handleRemoveFavorite = (imdbID) => {
		const updatedFavorites = favorites.filter(
			(favorite) => favorite.imdbID
		);
		setFavorites(updatedFavorites);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	};

	useEffect(() => {
		const storedFavorites =
			JSON.parse(localStorage.getItem("favorites")) || [];
		setFavorites(storedFavorites);
	}, []);

	const handleMovieClick = (imdbID) => {
		navigate(`/movies/${imdbID}`);
	};

	return (
		<div className="p-4 text-white">
			<h1 className="text-2xl text-white font-bold mb-4">
				My Favorite Movies
			</h1>
			{favorites.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					{favorites.map((movie) => (
						<div
							key={movie.imdbID}
							className="bg-transparent rounded-lg flex flex-col"
						>
							<img
								src={movie.Poster}
								alt={movie.Title}
								className="w-full h-90 rounded-t-lg object-cover"
								onClick={() => handleMovieClick(movie.imdbID)}
							/>
							<h3 className="text-center text-sm mt-2 truncate">
								{movie.Title}
							</h3>
							<button
								onClick={() =>
									handleRemoveFavorite(movie.imdbID)
								}
								className=" bg-sky-900 text-red-500 font-bold text-center mt-2"
							>
								Remove from Favorites
							</button>
						</div>
					))}
				</div>
			) : (
				<div className="text-gray-800 text-center">
					No favorite movies found.
				</div>
			)}
		</div>
	);
};
export default Favorites;
