import React, { useEffect, useRef, useState } from "react";
import ActionMoviesSection from "./ActionMoviesSection";
import DramaMoviesSection from "./DramaMoviesSection";
import SearchComponent from "./SearchComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturedSection = () => {
	const [featuredMovies, setFeaturedMovies] = useState([]);
	const [actionMovies, setActionMovies] = useState([]);
	const [dramaMovies, setDramaMovies] = useState([]);
	const scrollRef = useRef(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const featuredResponse = await import(
					"../data/featuredMovies.json"
				);
				setFeaturedMovies(featuredResponse.default);

				const genresResponse = await import(
					"../data/genresMovies.json"
				);
				const movies = genresResponse.default;

				const action = movies.filter((movie) =>
					movie.Genre.includes("Action")
				);
				const drama = movies.filter((movie) =>
					movie.Genre.includes("Drama")
				);

				setActionMovies(action);
				setDramaMovies(drama);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};

		fetchMovies();
	}, []);
	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	return (
		<div className="relative py-4">
			<SearchComponent />
			<h2 className="text-xl font-bold mb-2">Featured Movies</h2>
			<div className="flex items-center">
				<button
					onClick={scrollLeft}
					className="p-2 bg-gray-700 text-white rounded-l"
				>
					<FaArrowLeft className="h-5 w-5" />
				</button>
				<div
					ref={scrollRef}
					className="flex space-x-4 overflow-x-auto w-full sm:justify-center"
					style={{ maxWidth: "100%", overflowY: "hidden" }}
				>
					{featuredMovies.length > 0 ? (
						featuredMovies.map((movie) => (
							<div
								key={movie.imdbID}
								className="w-40 h-100 bg-gray-300 sm:w-52 rounded-lg flex-shrink-0"
							>
								<img
									src={movie.Poster}
									alt={movie.Title}
									className="w-full rounded-t-lg object-cover"
								/>
								<h3 className="text-center text-sm mt-2">
									{movie.Title}
								</h3>
							</div>
						))
					) : (
						<div className="text-center">
							No featured movies found.
						</div>
					)}
				</div>
				<button
					onClick={scrollRight}
					className="p-2 bg-gray-700 text-white rounded-r"
				>
					{" "}
					<FaArrowRight className="h-5 w-5" />
				</button>
			</div>

			{/* {Action Movies} */}
			<ActionMoviesSection actionMovies={actionMovies} />

			{/* {drama movies} */}
			<DramaMoviesSection dramaMovies={dramaMovies} />
		</div>
	);
};

export default FeaturedSection;
