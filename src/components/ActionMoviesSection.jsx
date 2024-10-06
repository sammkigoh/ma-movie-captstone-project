import React from "react";
import { Link } from "react-router-dom";

const ActionMoviesSection = ({ actionMovies }) => {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4 mt-4">Action Movies</h2>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{actionMovies.length > 0 ? (
					actionMovies.map((movie) => (
						<Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
							<div
								key={movie.imdbID}
								className=" bg-transparent text-white font-bold rounded-lg flex flex-col"
							>
								<img
									src={movie.Poster}
									alt={movie.Title}
									className="w-full h-90 rounded-t-lg object-cover"
								/>
								<h3 className="text-center text-sm mt-2 truncate">
									{movie.Title}
								</h3>
							</div>
						</Link>
					))
				) : (
					<div className="text-center">No Action Movies found.</div>
				)}
			</div>
		</div>
	);
};
export default ActionMoviesSection;
