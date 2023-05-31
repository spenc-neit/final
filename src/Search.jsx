import { useFetch } from "./hooks/useFetch";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

export const Search = () =>{
    const {theme} = useContext(ThemeContext)
    const [searchInput, setSearchInput] = useState("")
    const {data, loading, error} = useFetch("https://pokeapi.co/api/v2/pokedex/original-unova/")

    const pokemon = data.pokemon_entries

    const searchBoxChange = (event) =>{
        const val = event.target.value
        setSearchInput(val)
    }

    const displayResults = (list) =>{
        return list.map((entry)=>{
            return(
                <p key={entry.id} style={{color:"red"}}>{entry.name}, {entry.id}</p>
            )
        })
    }

    let simplifiedPokemonList = []

    if (loading) {
		return <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{height:"50px"}} />;
		//if loading is true, then return the element and stop running the code
	}

    pokemon.map((entry) => {
            simplifiedPokemonList.push({name: entry.pokemon_species.name, id: entry.pokemon_species.url.slice(entry.pokemon_species.url.indexOf("s/") +2).replace("/", "")})
        }
    )

    if(error){
        return(
            <p style={{color:theme.foreground}}>Pokemon not found</p>
        )
    }

    if(searchInput.length > 0){
        let searchResults = simplifiedPokemonList.filter((entry)=>{
            return(entry.name.match(searchInput))
        })
        if(searchResults.length > 0){ //if result is found
            return(
                <>
                    <input type="text" style={{color:theme.foreground, backgroundColor:theme.boxbg}} onChange={searchBoxChange}></input>
                    {displayResults(searchResults)}
                </>
            )
        } //if they entered data but there's no match
        return(
            <>
                <input type="text" style={{color:theme.foreground, backgroundColor:theme.boxbg}} onChange={searchBoxChange}></input>
                <p style={{color:"red"}}>Not found</p>
            </>
        )
    }

    return( //start of page or empty search box
        <>
        <input type="text" style={{color:theme.foreground, backgroundColor:theme.boxbg}} onChange={searchBoxChange}></input>
        </>
    )
}