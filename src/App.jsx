import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FeaturedSection from "./components/FeaturedSection";
import MovieDetails from "./components/MovieDetails";
import SearchMovieDetails from "./components/SearchMovieDetails";
import Favorites from "./components/Favorites";
import About from "./components/About";
import Footer from "./components/Footer";
import "./index.css";
import "./App.css";
import SearchComponent from "./components/SearchComponent";

const App = () => {
	useEffect(() => {
		const isDarkMode = localStorage.getItem("darkMode") === "true";
		if (isDarkMode) {
			document.body.classList.add("dark");
		}
	}, []);
	return (
		<Router>
			<div className="bg-background text-text min-h-screen">
				<Navbar />

				<Routes>
					<Route path="/" element={<FeaturedSection />} />
					<Route path="/movies/:id" element={<MovieDetails />} />
					<Route path="/search" element={<SearchComponent />} />
					<Route
						path="/search-movies/:id"
						element={<SearchMovieDetails />}
					/>
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
