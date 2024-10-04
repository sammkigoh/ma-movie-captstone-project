import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterComponent = ({ onFilterChange }) => {
	const [filters, setFilters] = useState({
		year: "",
		genre: "",
		rating: "",
	});
	const [years, setYears] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_REACT_APP_API_URL
					}genre/movie/list?api_key=${
						import.meta.env.VITE_REACT_APP_API_KEY
					}`
				);
				setGenres(response.data.genres);
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};
		//allowing users to select instead of typing the year
		const currentYear = new Date().getFullYear();
		const yearsArray = Array.from(
			{ length: 50 },
			(_, i) => currentYear - i
		);
		setYears(yearsArray);

		fetchGenres();
	}, []);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
		onFilterChange({ ...filters, [name]: value });
	};

	return (
		<div className="flex justify-center space-x-4">
			<div>
				<label className="block">Year:</label>
				<select
					name="year"
					value={filters.year}
					onChange={handleChange}
					className="p-2 border rounded"
				>
					<option value="">Select Year</option>
					{years.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
			<div>
				<label className="block">Genre:</label>
				<select
					name="genre"
					value={filters.genre}
					onChange={handleChange}
					className="p-2 border rounded"
				>
					<option value="">Select Genre</option>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label className="block">IMDb Rating:</label>
				<input
					type="number"
					name="rating"
					placeholder="enter rating"
					value={filters.rating}
					onChange={handleChange}
					className="p-2 border rounded"
				/>
			</div>
		</div>
	);
};

export default FilterComponent;
