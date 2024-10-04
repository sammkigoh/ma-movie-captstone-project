import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};
	const toggleTheme = () => {
		setIsDarkMode((prev) => {
			const newDarkMode = !prev;
			document.documentElement.classList.toggle("dark", newDarkMode);
			localStorage.setItem("darkMode", newDarkMode);
			return newDarkMode;
		});
	};

	useEffect(() => {
		const darkModePreference = localStorage.getItem("darkMode") === "true";
		setIsDarkMode(darkModePreference);
		document.documentElement.classList.toggle("dark", darkModePreference);
	}, []);

	return (
		<nav className="bg-primary p-4 flex items-center justify-between">
			<div className="flex items-center">
				<Link to="/" className="flex items-center">
					<img
						src="https://res.cloudinary.com/dsbgi2jbh/image/upload/v1727975807/mamovie_svg_qqhg0p.svg"
						alt="Ma-Movie Logo"
						className="h-40 w-auto"
					/>
				</Link>
				<button
					className="text-white focus:outline-none md:hidden"
					onClick={toggleMenu}
				>
					{menuOpen ? (
						<i className="fa fa-times h-6 w-6"></i> // Close icon
					) : (
						<i className="fa fa-bars h-6 w-6"></i> // Hamburger icon
					)}
				</button>
			</div>

			{/* Menu on desktops */}
			<div className="hidden md:flex items-center space-x-4">
				<Link to="/" className="text-white">
					Home
				</Link>
				<Link to="/favorites" className="text-white">
					Favorites
				</Link>
				<Link to="/about" className="text-white">
					About
				</Link>
				<div className="flex flex-col justify-center ml-3">
					<input
						type="checkbox"
						name="light-switch"
						className="light-switch sr-only"
						checked={isDarkMode}
						onChange={toggleTheme}
					/>
					<label
						htmlFor="light-switch"
						className="relative p-2 cursor-pointer"
					>
						<svg
							className="dark:hidden"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-slate-300"
								d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
							/>
							<path
								className="fill-slate-400"
								d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
							/>
						</svg>
						<svg
							className="hidden dark:block"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-slate-400"
								d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
							/>
							<path
								className="fill-slate-500"
								d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
							/>
						</svg>
						<span className="sr-only">
							Switch to light / dark version
						</span>
					</label>
				</div>
				<Link to="/search" className="text-white">
					<FaSearch className="h-6 w-6" />
				</Link>
			</div>

			{/* The menu on mobile devices */}
			<div
				className={`absolute top-16 left-0 w-full bg-primary p-4 transition-all duration-300 ease-in-out ${
					menuOpen ? "block" : "hidden"
				} md:hidden`}
			>
				<button className="text-white mb-2" onClick={toggleMenu}>
					<i className="fa fa-times h-6 w-6"></i> {/* Close icon */}
				</button>
				<Link to="/" className="block text-white mb-2">
					Home
				</Link>
				<Link to="/favorites" className="block text-white mb-2">
					Favorites
				</Link>
				<Link to="/about" className="block text-white mb-2">
					About Me
				</Link>
				<div className="flex flex-col justify-center ml-3">
					<input
						type="checkbox"
						name="light-switch"
						className="light-switch sr-only"
						checked={isDarkMode}
						onChange={toggleTheme}
					/>
					<label
						htmlFor="light-switch"
						className="relative p-2 cursor-pointer"
					>
						<svg
							className="dark:hidden"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-slate-300"
								d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
							/>
							<path
								className="fill-slate-400"
								d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
							/>
						</svg>
						<svg
							className="hidden dark:block"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								className="fill-slate-400"
								d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
							/>
							<path
								className="fill-slate-500"
								d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
							/>
						</svg>
						<span className="sr-only">
							Switch to light / dark version
						</span>
					</label>
				</div>
				<Link to="/search" className="block text-white mb-2">
					<FaSearch className="h-6 w-6" />
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
