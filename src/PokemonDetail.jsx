import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const PokemonDetail = () =>{

    const titleCase = (input) =>{
        return input.charAt(0).toUpperCase() + input.slice(1)
    }

    const getTypeString = (typeList) =>{
        let twoTypes = false;
        let typeString = "";
        for(let i = 0; i<typeList.length; i++){
            typeString += twoTypes ? "/"+titleCase(typeList[i].type.name) : titleCase(typeList[i].type.name)
            twoTypes = true;
        }
        return typeString;
    }

    const formatAbilityName = (name) =>{
        let newName = ""
        let splitName = name.split("-")
        if(splitName.length > 1){
            let second = false;
            splitName.map((entry)=>{
                if(second){
                    newName += " " + titleCase(entry)
                } else{
                    newName += titleCase(entry)
                    second = true;
                }
            })
        } else {
            newName = titleCase(name)
        }
        return newName
    }

    const getAbilities = (abilityList) =>{
        let afterFirst = false;
        return(
            abilityList.map((entry)=>{
                let id = entry.ability.url.slice(entry.ability.url.indexOf("y/") +2)
                if(afterFirst){
                    return(<span> or <Link style={{color:`${theme.linkcolor}`}} to={"../../ability/" + id}>{formatAbilityName(entry.ability.name)}</Link></span>)
                } else {
                    afterFirst = true;
                    return(<Link style={{color:`${theme.linkcolor}`}} to={"../../ability/" + id}>{formatAbilityName(entry.ability.name)}</Link>) 
                }
            })
        )
    }
    const {theme} = useContext(ThemeContext)
    const {id} = useParams();
    const {data, loading, error} = useFetch("https://pokeapi.co/api/v2/pokemon/" + id);

    if (loading) {
		return <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{height:"50px"}} />;
		//if loading is true, then return the element and stop running the code
	}

    const testEl = () =>{
        return(
            <p style={{color:"black"}}>hi</p>
        )
    }

    console.log(data.types)

    getTypeString(data.types)
    
    console.log(data)
    return(
        <div className="box" style={{backgroundColor:theme.boxbg, border:theme.border, display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", alignItems:"center", width:"100%", color:`${theme.foreground}`}}>
                <img src={data.sprites.front_default} alt={data.species.name} style={{height:"20em"}} />
                <div style={{width:"85%"}}>
                    <h1 style={{fontSize:"2.5em"}}>{titleCase(data.species.name)}</h1>
                    <p style={{fontSize:"2em"}}>Type: {getTypeString(data.types)}</p>
                    <p style={{fontSize:"1.5em"}}>Ability: {getAbilities(data.abilities)}</p>
                    <p>Stats</p>
                    <table style={{marginBottom:"2em"}}>
                        <tr>
                            <td>HP:</td>
                            <td>{data.stats[0].base_stat}</td>
                        </tr>
                        <tr>
                            <td>Attack:</td>
                            <td>{data.stats[1].base_stat}</td>
                        </tr>
                        <tr>
                            <td>Defense:</td>
                            <td>{data.stats[2].base_stat}</td>
                        </tr>
                        <tr>
                            <td>Special Attack:</td>
                            <td>{data.stats[3].base_stat}</td>
                        </tr>
                        <tr>
                            <td>Special Defense:</td>
                            <td>{data.stats[4].base_stat}</td>
                        </tr>
                        <tr>
                            <td>Speed:</td>
                            <td>{data.stats[5].base_stat}</td>
                        </tr>
                    </table>
                </div>
                <p style={{width:"15%", textAlign:"center", fontSize:"1.5em"}}>No. {id}</p>
            </div>
        </div>

        
    )
}