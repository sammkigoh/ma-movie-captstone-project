/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Light Mode Colors
				background: {
					light: "#F5F5F5", // Light Gray
					dark: "#121212", // Dark Gray
				},
				text: {
					light: "#333333", // Dark Gray
					dark: "#E0E0E0", // Light Gray
				},
				accent: {
					red: {
						DEFAULT: "#E53935", // Light Mode Red
						dark: "#FF5252", // Dark Mode Red
					},
					blue: {
						DEFAULT: "#1E88E5", // Light Mode Blue
						dark: "#448AFF", // Dark Mode Blue
					},
				},
			},
			fontFamily: {
				sans: ["Zain", "sans-serif"], // Default font
			},
		},
	},
	plugins: [],
};
