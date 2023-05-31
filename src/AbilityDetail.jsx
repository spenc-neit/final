import { Link, useParams } from "react-router-dom"
import { useFetch } from "./hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const AbilityDetail = () =>{

    const titleCase = (input) =>{
        return input.charAt(0).toUpperCase() + input.slice(1)
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

    const getAbilityHavers = (list) =>{
        return(
        list.map((entry)=>{
            let dexno = Number(entry.pokemon.url.slice(entry.pokemon.url.indexOf("n/") + 2).replace("/", ""))
            const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + dexno + ".png"
            if(dexno > 493 && dexno < 650){
                return(
                    
                    <Link key={dexno} style={{color:`${theme.linkcolor}`}} to={"../../pokemon/" + dexno} className="abilityListItem"><img src={sprite} style={{dipslay:"inline-block"}} />{titleCase(entry.pokemon.name)}</Link>
                    
                )
            }
        })
        )
    }

    const {theme} = useContext(ThemeContext);
    const {id} = useParams();
    const {data, loading, error} = useFetch("https://pokeapi.co/api/v2/ability/" + id);
    console.log(data)

    if (loading) {
		return <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" style={{height:"50px"}} />;
		//if loading is true, then return the element and stop running the code
	}
    

    return(
        <>
        
        <div className="box" style={{backgroundColor:theme.boxbg, border:theme.border, display:"flex", justifyContent:"space-between"}}>
            <div style={{color:`${theme.foreground}`}}>
                <h1>{formatAbilityName(data.name)}</h1>
                <p>{data.flavor_text_entries.slice(-3)[0].flavor_text.replace("\n", " ")}</p>
                <h3>Pokemon that have {formatAbilityName(data.name)}:</h3>
                <div style={{display:"grid", gridTemplateColumns: "auto auto auto auto auto"}}>
                {getAbilityHavers(data.pokemon)}
                </div>
            </div>
            <div></div>

        </div>
        
        </>
    )
}