import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar";
import MainBanner from "./components/MainBanner";
import SearchComponent from "./components/SearchComponent";
import FeaturedSection from "./components/FeaturedSection";
import MovieDetails from "./components/MovieDetails";
import SearchMovieDetails from "./components/SearchMovieDetails";
import Favorites from "./components/Favorites";
import About from "./components/About";
import Footer from "./components/Footer";
import "./index.css";
import "./App.css";
import "daisyui";

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
				<ThemeProvider>
					<Navbar />
					<MainBanner />

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
				</ThemeProvider>
			</div>
		</Router>
	);
};

export default App;
