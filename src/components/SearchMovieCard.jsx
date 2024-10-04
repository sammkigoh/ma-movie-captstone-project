import React from "react";

const SearchMovieCard = ({ movie, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="cursor-pointer bg-gray-300 rounded-lg flex-col"
		>
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
				className="w-full h-90 rounded-t-lg object-cover"
			/>
			<h3 className="text-center text-sm mt-2 truncate">{movie.title}</h3>
		</div>
	);
};

export default SearchMovieCard;
