/** @type {import('tailwindcss').Config} */
module.exports = {
	daisyui: {
		themes: ["light", "dark", "cyberpunk", "cupcake"],
	},
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#a991f7",
				secondary: "#f6d860",
				accent: "#37cdbe",
				neutral: "#3d4451",
				"base-100": "#ffffff",
			},
			fontFamily: {
				sans: ["Zain", "sans-serif"],
			},
		},
	},
	plugins: [require("daisyui")],
};
