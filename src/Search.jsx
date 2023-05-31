import { useFetch } from "./hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { titleCase } from "./functions/titleCase";

export const Search = () => {
	const { theme } = useContext(ThemeContext);
	const [searchInput, setSearchInput] = useState("");
	const { data, loading, error } = useFetch(
		"https://pokeapi.co/api/v2/pokedex/original-unova/"
	);

	const pokemon = data.pokemon_entries;

	const searchBoxChange = (event) => {
		const val = event.target.value.toLowerCase();
		setSearchInput(val);
	};

	const displayResults = (list) => {
		return list.map((entry) => {
			return (
				<div
					className="box"
					style={{
						backgroundColor: theme.boxbg,
						border: theme.border,
						textAlign: "center",
					}}
					key={entry.id}
				>
					<Link
						to={"../pokemon/" + entry.id}
						style={{
							color: theme.linkcolor,
							padding: "1em",
							fontSize: "1.25em",
						}}
					>
						{titleCase(entry.name)}
					</Link>
				</div>
			);
		});
	};

	if (loading) {
		return (
			<img
				src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
				style={{ height: "50px" }}
			/>
		);
		//if loading is true, then return the element and stop running the code
	}

	let simplifiedPokemonList = [];

	pokemon.map((entry) => {
		simplifiedPokemonList.push({
			name: entry.pokemon_species.name,
			id: entry.pokemon_species.url
				.slice(entry.pokemon_species.url.indexOf("s/") + 2)
				.replace("/", ""),
		});
	});

	if (error) {
		return <p style={{ color: theme.foreground }}>Pokemon not found</p>;
	}

	if (searchInput.length > 0) {
		let searchResults = [];
		simplifiedPokemonList.map((entry) => {
			if (entry.name.includes(searchInput)) {
				searchResults.push({ name: entry.name, id: entry.id });
			}
		});
		if (searchResults.length > 0) {
			//if result is found
			// console.log(searchResults, "searchResults")
			return (
				<>
					<input
						type="text"
						style={{
							color: theme.foreground,
							backgroundColor: theme.boxbg,
							width: "50%",
						}}
						onChange={searchBoxChange}
					></input>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "auto auto auto auto auto",
						}}
					>
						{displayResults(searchResults)}
					</div>
					<div id={"root-modal"}></div>
				</>
			);
		} //if they entered data but there's no match
		return (
			<>
				<input
					type="text"
					style={{
						color: theme.foreground,
						backgroundColor: theme.boxbg,
						width: "50%",
					}}
					onChange={searchBoxChange}
				></input>
				<p style={{ color: "red" }}>Not found</p>
			</>
		);
	}

	return (
		//start of page or empty search box
		<>
			<input
				type="text"
				style={{
					color: theme.foreground,
					backgroundColor: theme.boxbg,
					width: "50%",
				}}
				onChange={searchBoxChange}
			></input>
		</>
	);
};
