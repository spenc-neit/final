import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import { useFetch } from "../hooks/useFetch";
import {PokemonCard} from "./PokemonCard"
import {Button} from "./Button"
import {Text} from "./Text"
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();
	const {theme} = useContext(ThemeContext)
	const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokedex/original-unova/");
	

	const pokemon = data.pokemon_entries
	console.log(pokemon)

	if (error) {
		return <p>An error occurred: {error}</p>;
	}

	if (loading) {
		return <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{height:"50px"}} />;
		//if loading is true, then return the element and stop running the code
	}

	const output = pokemon.map((entry) => {
        return(
			<PokemonCard key={entry.entry_number} url={entry.pokemon_species.url} />
		)
	});

	

	return (
		<>
			
			<div style={{display:"grid", gridTemplateColumns:"auto auto auto auto auto"}}>{output}</div>
		</>
	);
}

export default Home;