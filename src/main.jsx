import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<FavoritesProvider>
				<App />
			</FavoritesProvider>
		</ThemeProvider>
	</StrictMode>
);
