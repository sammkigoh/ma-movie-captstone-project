import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchMovieCard from "./SearchMovieCard";
import FilterComponent from "./FilterComponent";

const SearchComponent = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState([]);
	const [filters, setFilters] = useState({ year: "", genre: "", rating: "" });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const [hasSearched, setHasSearched] = useState(false);
	const resultsPerPage = 4;
	const navigate = useNavigate();

	const handleSearch = async (e) => {
		if (e) e.preventDefault();
		setHasSearched(true); //want to ensure the pagination and the buttons only appear when the search or filter has been initiated
		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_REACT_APP_API_URL
				}search/movie?api_key=${
					import.meta.env.VITE_REACT_APP_API_KEY
				}&query=${encodeURIComponent(
					searchTerm
				)}&page=${currentPage}&primary_release_year=${
					filters.year
				}&with_genres=${filters.genre}&vote_average.gte=${
					filters.rating
				}`
			);
			setMovies(response.data.results || []);
			setTotalResults(response.data.total_results);
			setCurrentPage(1);
		} catch (error) {
			console.error("Error fetching movie data:", error);
		}
	};
	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
		setCurrentPage(1);
		handleSearch();
	};

	const filteredMovies = movies.filter((movie) => {
		const yearMatch = filters.year
			? movie.release_date.startsWith(filters.year)
			: true;
		const genreMatch = filters.genre
			? movie.genre_ids.includes(parseInt(filters.genre))
			: true;
		const ratingMatch = filters.rating
			? movie.vote_average >= filters.rating
			: true;

		return yearMatch && genreMatch && ratingMatch;
	});
	//some mazematics for the pages implementation
	const indexOfLastMovie = currentPage * resultsPerPage;
	const indexOfFirstMovie = indexOfLastMovie - resultsPerPage;
	const currentMovies = filteredMovies.slice(
		indexOfFirstMovie,
		indexOfLastMovie
	);

	const handleMovieClick = (movieID) => {
		navigate(`/search-movies/${movieID}`);
	};

	const totalPages = Math.ceil(totalResults / resultsPerPage);

	//need to reset the page when a user is done with the search results and goes to another page
	useEffect(() => {
		return () => {
			setMovies([]);
			setSearchTerm("");
			setFilters({ year: "", genre: "", rating: "" });
			setCurrentPage(1);
		};
	}, []);
	return (
		<div className="p-6 text-current">
			<form onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="What movie are you looking for"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="p-2 w-full border rounded text-current bg-transparent"
				/>
				<button
					type="submit"
					className="p-2 m-4 bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-white"
				>
					Search
				</button>
			</form>
			<FilterComponent onFilterChange={handleFilterChange} />
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
				{hasSearched && currentMovies.length > 0 ? (
					currentMovies.map((movie) => (
						<SearchMovieCard
							key={movie.id}
							movie={movie}
							onClick={() => handleMovieClick(movie.id)}
						/>
					))
				) : (
					<div className="text-center">
						{hasSearched ? "No movies found." : ""}.
					</div>
				)}
			</div>
			<div className="flex justify-between mt-4">
				{hasSearched && (
					<>
						<button
							disabled={currentPage === 1}
							onClick={() => setCurrentPage(currentPage - 1)}
							className="bg-green-500 text-white rounded-full px-4 m-6 py-2"
						>
							Prev
						</button>
						<button
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(currentPage + 1)}
							className="bg-green-500 text-white rounded-full px-4 py-2"
						>
							Next
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SearchComponent;
