import { useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import { FavoritesCard } from "./FavoritesCard";
import { useSelector } from "react-redux";
function Party() {
	const { theme } = useContext(ThemeContext);
	const favorites = useSelector((state) => state.pokemon);

	useEffect(() => {
		document.body.style.backgroundColor = theme.background;
	}, [theme]);

	if (favorites.length === 0) {
		return <p style={{ color: theme.foreground }}>Favorites list is empty</p>;
	}

	return favorites.map((entry) => {
		return (
			<FavoritesCard
				key={entry.value}
				url={"https://pokeapi.co/api/v2/pokemon-species/" + entry.value}
			/>
		);
	});
}

export default Party;
