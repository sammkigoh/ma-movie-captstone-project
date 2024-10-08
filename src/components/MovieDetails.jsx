import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import movieData from "../data/genresMovies.json";

const MovieDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isFavorited, setIsFavorited] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState("");

	const movie = movieData.find((movie) => movie.imdbID === id);

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		if (
			movie &&
			favorites.some((favorite) => favorite.imdbID === movie.imdbID)
		) {
			setIsFavorited(true);
		}
	}, [movie]);

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
			setFeedbackMessage("Removed to favorites");
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
				<button onClick={handleBack} className="text-current">
					&lt; Back
				</button>
				<h1 className="text-2xl font-bold mt-2">Movie Not Found</h1>
			</div>
		);
	}

	return (
		<div className="p-4">
			<button
				onClick={handleBack}
				className="text-current font-bold bg-transparent"
			>
				{"< "}
			</button>
			<h1 className="text-2xl text-current font-bold mt-4">
				{movie.Title}
			</h1>
			<div className="flex justify-center mt-6">
				<button
					onClick={handleFavorite}
					className={`text-red-500 flex items-center badge badge-success font-bold p-4 space-s-9`}
				>
					<FaHeart />
				</button>
				{feedbackMessage && (
					<p className="text-green-500">{feedbackMessage}</p>
				)}
			</div>
			<img
				src={movie.Poster}
				alt={movie.Title}
				className="mx-auto bg-transparent mt-4 max-w-lg h-auto w-full rounded-lg"
			/>
			<div className="flex justify-center space-x-4 mt-10">
				<span className="badge badge-error font-bold p-4">
					{movie.Year}
				</span>
				<span className="badge badge-success font-bold p-4">
					{movie.Genre}
				</span>
				<span className="badge badge-info font-bold p-4">
					{movie.Rating}
				</span>
			</div>
			<h3 className="mt-4 font-bold">Cast:</h3>
			<p>{movie.Cast}</p>
			<h3 className="mt-4 font-bold">Plot:</h3>
			<p className="mx-auto mt-4 max-w-lg h-auto border rounded-lg p-4">
				{movie.Plot}
			</p>
			<h3 className="mt-4 font-bold pt-4 pb-4">Trailer:</h3>
			<div className="aspect-video">
				<iframe
					src={movie.Trailer}
					className="h-full w-full"
					frameBorder="0"
					width="100%"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default MovieDetails;
