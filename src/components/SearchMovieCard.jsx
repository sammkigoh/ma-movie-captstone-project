import React from "react";

const SearchMovieCard = ({ movie, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="card cursor-pointer bg-transparent rounded-lg flex flex-col shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
		>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
				className="w-full h-90 rounded-t-lg object-cover"
			/>
			<h3 className="text-center font-bold text-sm mt-2 break-words w-full px-1">
				{movie.title}
			</h3>
		</div>
	);
};

export default SearchMovieCard;
