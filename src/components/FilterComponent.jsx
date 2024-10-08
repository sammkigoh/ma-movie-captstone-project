import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterComponent = ({ onFilterChange }) => {
	const [filters, setFilters] = useState({
		genre: "",
		rating: "",
	});
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

		fetchGenres();
	}, []);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
		onFilterChange({ ...filters, [name]: value });
	};

	return (
		<div className="flex justify-center mt-4 space-x-4 text-current">
			<select
				name="genre"
				className="select select-bordered text-current w-full max-w-xs"
				onChange={handleChange}
			>
				<option value="">Genre</option>
				{genres.map((genre) => (
					<option key={genre.id} value={genre.id}>
						{genre.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default FilterComponent;
