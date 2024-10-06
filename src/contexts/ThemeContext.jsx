import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const darkModePreference = localStorage.getItem("darkMode") === "true";
		setIsDarkMode(darkModePreference);
		document.documentElement.setAttribute(
			"data-theme",
			darkModePreference ? "dark" : "light"
		);
	}, []);

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
