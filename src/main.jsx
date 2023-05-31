import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.jsx";
import Home from "./components/Home.jsx";
import Party from "./components/Party.jsx";
import { PokemonDetail } from "./PokemonDetail.jsx";
import { AbilityDetail } from "./AbilityDetail.jsx";
import { Search } from "./Search.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />}>
							<Route index element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="party" element={<Party />} />
							<Route path="pokemon/:id" element={<PokemonDetail />} />
							<Route path="ability/:id" element={<AbilityDetail />} />
							<Route path="search" element={<Search />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
