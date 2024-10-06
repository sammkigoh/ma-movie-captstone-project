import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ActionMoviesSection from "./ActionMoviesSection";
import DramaMoviesSection from "./DramaMoviesSection";
import SearchComponent from "./SearchComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick/lib/slider";

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
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
		],
	};

	return (
		<div className="relative py-4">
			<SearchComponent />
			<h2 className="text-xl font-bold mb-6">Featured Movies</h2>
			<Slider {...settings}>
				{featuredMovies.length > 0 ? (
					featuredMovies.map((movie) => (
						<Link
							to={`/movies/${movie.imdbID}`}
							key={movie.imdbID}
							className="w-32 h-100 bg-transparent sm:w-40 md:48 lg: w-52 rounded-lg flex-shrink-0 transition-transform transform hover:scale-105"
						>
							<img
								src={movie.Poster}
								alt={movie.Title}
								className="w-full rounded-t-lg object-cover"
							/>
							<h3 className="text-center text-white text-sm mt-2">
								{movie.Title}
							</h3>
						</Link>
					))
				) : (
					<div className="text-center text-white">
						No featured movies found.
					</div>
				)}
			</Slider>

			{/* {Action Movies} */}
			<ActionMoviesSection actionMovies={actionMovies} />

			{/* {drama movies} */}
			<DramaMoviesSection className dramaMovies={dramaMovies} />
		</div>
	);
};

export default FeaturedSection;
