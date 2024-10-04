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
				}discover/movie?api_key=${
					import.meta.env.VITE_REACT_APP_API_KEY
				}&page=${currentPage}&primary_release_year=${
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
			? movie.genre_ids.includes(filters.genre)
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

	const handleMovieClick = (imdbID) => {
		navigate(`/search-movies/${imdbID}`);
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
		<div className="p-4 text-white">
			<form onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="What movie are you looking for"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="p-2 border rounded"
				/>
				<button
					type="submit"
					className="p-2 bg-primary text-white rounded"
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
						{" "}
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
							className="bg-blue-500 text-white rounded px-4 py-2"
						>
							Prev
						</button>
						<button
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage(currentPage + 1)}
							className="bg-blue-500 text-white rounded px-4 py-2"
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
