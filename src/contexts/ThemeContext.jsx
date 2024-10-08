import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const darkModePreference = localStorage.getItem("darkMode");
		return darkModePreference === "true";
	});

	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			isDarkMode ? "dark" : "light"
		);
		localStorage.setItem("darkMode", isDarkMode);
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prev) => {
			const newDarkMode = !prev;
			localStorage.setItem("darkMode", newDarkMode);
			document.documentElement.setAttribute(
				"data-theme",
				newDarkMode ? "dark" : "light"
			);
			return newDarkMode;
		});
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
