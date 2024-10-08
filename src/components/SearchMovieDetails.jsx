import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const SearchMovieDetails = () => {
	const { addFavorite } = useContext(FavoritesContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState(null);
	const [isFavorited, setIsFavorited] = useState("");
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_REACT_APP_API_URL
					}movie/${id}?api_key=${
						import.meta.env.VITE_REACT_APP_API_KEY
					}`
				);
				setMovie(response.data);

				//trailer
				const trailerResponse = await axios.get(
					`${
						import.meta.env.VITE_REACT_APP_API_URL
					}movie/${id}/videos?api_key=${
						import.meta.env.VITE_REACT_APP_API_KEY
					}`
				);
				const trailers = trailerResponse.data.results;
				if (trailers.length > 0) {
					setTrailerUrl(
						`https://www.youtube.com/watch?v=${trailers[0].key}`
					);
				}
			} catch (error) {
				console.error("Error fetching movie data:", error);
			}
		};
		fetchMovieDetails();
	}, [id]);

	const handleBack = () => {
		navigate(-1);
	};
	const handleFavorite = () => {
		addFavorite(movie);
		const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		if (!isFavorited) {
			// favorites.push(movie);
			// localStorage.setItem("favorites", JSON.stringify(favorites));
			// setIsFavorited(true);
			// setFeedbackMessage("Added to favorites");
		} else {
			const updatedFavorites = favorites.filter(
				(favorite) => favorite.imdbID !== movie.imdbID
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			setIsFavorited(false);
			setFeedbackMessage("Removed from favorites");
		}
	};
	useEffect(() => {
		if (feedbackMessage) {
			const timer = setTimeout(() => {
				setFeedbackMessage("");
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [feedbackMessage]);
	if (!movie) {
		return (
			<div className="p-4">
				<button onClick={handleBack} className="text-gray-700">
					{"< Back"}
				</button>
				<h1 className="text-2xl font-bold mt-2">Movie Not Found</h1>
			</div>
		);
	}

	return (
		<div className="p-4">
			<button
				onClick={handleBack}
				className="text-white font-bold bg-transparent"
			>
				{"< "}
			</button>
			<h1 className="text-2xl text-white font-bold mt-4 break-words">
				{movie.title}
			</h1>
			<div className="flex justify-center mt-6">
				<button
					onClick={handleFavorite}
					className="text-red-500 flex items-center badge badge-success font-bold p-4 space-x-9"
				>
					<FaHeart /> {isFavorited ? "Unfavorite" : "Favorite"}
				</button>
				{feedbackMessage && (
					<p className="text-green-500">{feedbackMessage}</p>
				)}
			</div>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
				className=" mx-auto bg-transparent mt-4 max-w-lg h-auto rounded-lg"
			/>
			<div className="flex justify-center space-x-4 mt-10">
				<span className="badge badge-error font-bold m-3 p-4">
					{movie.release_date.split("-")[0]}
				</span>
				<span className="badge badge-success font-bold m-3 p-4">
					{movie.genres.map((genre) => genre.name).join(", ")}
				</span>
				<span className="badge badge-info font-bold p-4">
					{movie.vote_average}
				</span>
			</div>
			<h3 className="mt-4 font-bold">Plot:</h3>
			<p className="mx-auto mt-4 max-w-lg h-auto border rounded-lg p-4">
				{movie.overview}
			</p>
			{trailerUrl && (
				<div className="mt-4">
					<h3 className="font-bold">Trailer:</h3>
					<a
						href={trailerUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500"
					>
						Watch Trailer
					</a>
				</div>
			)}
		</div>
	);
};

export default SearchMovieDetails;
