import { useFetch } from "../hooks/useFetch";
import { PokemonCard } from "./PokemonCard";

function Home() {
	const { data, loading, error } = useFetch(
		"https://pokeapi.co/api/v2/pokedex/original-unova/"
	);

	const pokemon = data.pokemon_entries;

	if (error) {
		return <p>An error occurred: {error}</p>;
	}

	if (loading) {
		return (
			<img
				src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
				style={{ height: "50px" }}
			/>
		);
		//if loading is true, then return the element and stop running the code
	}

	const output = pokemon.map((entry) => {
		return (
			<PokemonCard key={entry.entry_number} url={entry.pokemon_species.url} />
		);
	});

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "auto auto auto auto auto",
				}}
			>
				{output}
			</div>
			<div id="root-modal"></div>
		</>
	);
}

export default Home;
