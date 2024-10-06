import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<nav className="bg-transparent p-4 flex items-center justify-between">
			<div className="flex items-center">
				<Link to="/" className="flex items-center">
					<img
						src="https://res.cloudinary.com/dsbgi2jbh/image/upload/v1727975807/mamovie_svg_qqhg0p.svg"
						alt="Ma-Movie Logo"
						className="h-20 w-auto"
					/>
				</Link>
				<button
					className="text-white ml-4 focus:outline-none md:hidden"
					onClick={toggleMenu}
				>
					{menuOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						</svg>
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
				<div className="flex items-center ml-3">
					<input
						type="checkbox"
						className="toggle toggle-primary"
						checked={isDarkMode}
						onChange={toggleTheme}
					/>
				</div>
				<Link to="/search" className="text-white">
					<FaSearch className="h-6 w-6" />
				</Link>
			</div>

			{/* The menu on mobile devices */}
			<div
				className={`absolute top-16 left-0 w-full bg-gray-800 p-4 transition-all duration-300 ease-in-out ${
					menuOpen ? "block" : "hidden"
				} md:hidden z-50`}
			>
				<button className="text-white mb-2" onClick={toggleMenu}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
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
				<div className="flex items-center mb-2">
					<input
						type="checkbox"
						className="toggle toggle-primary"
						checked={isDarkMode}
						onChange={toggleTheme}
					/>
				</div>
				<Link to="/search" className="block text-white mb-2">
					<FaSearch className="h-6 w-6" />
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
