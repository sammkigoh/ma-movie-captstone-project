import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const SearchMovieDetails = () => {
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
		const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		if (!isFavorited) {
			favorites.push(movie);
			localStorage.setItem("favorites", JSON.stringify(favorites));
			setIsFavorited(true);
			setFeedbackMessage("Added to favorites");
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
			<h1 className="text-2xl font-bold mt-2">{movie.Title}</h1>
			<button onClick={handleFavorite} className="text-red-500">
				<FaHeart /> {isFavorited ? "Unfavorite" : "Favorite"}
			</button>
			{feedbackMessage && (
				<p className="text-green-500">{feedbackMessage}</p>
			)}
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.Title}
				className="mt-4 w-full rounded-lg"
			/>
			<div className="flex justify-center space-x-4 mt-10">
				<span className="bg-red-600 font-bold rounded-full px-4 py-2">
					{movie.release_date.split("-")[0]}
				</span>
				<span className="bg-lime-600 font-bold rounded-full px-4 py-2">
					{movie.genres.map((genre) => genre.name).join(", ")}
				</span>
				<span className="bg-fuchsia-600 font-bold rounded-full px-4 py-2">
					{movie.vote_average}
				</span>
			</div>
			<h3 className="mt-4 font-bold">Plot:</h3>
			<p className="border rounded-lg p-4">{movie.overview}</p>
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
