import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/actions";

const PokemonCard = (props) => {

    const {theme} = useContext(ThemeContext)

    const newUrl = (props.url.replace("-species/", "/"))

    const {data} = useFetch(newUrl)
    console.log(data)

    const buttonClickHandler = (newItem) =>{
        actionCreators.addToList(newItem.id)
    }
    
    if (data.length != 0) {
    return (
        <div className="box" style={{backgroundColor:theme.boxbg, border:theme.border, display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", alignItems:"center"}}>
            <img src={data.sprites.front_default} alt={data.species.name} style={{height:"4em"}} /> &nbsp; &nbsp;
            <Link to={"../pokemon/" + data.id} style={{color:theme.foreground, display:"inline-block"}}>{data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1)}</Link>
            </div>
            <button style={{backgroundColor:theme.background, color:theme.linkcolor, border:theme.border}} onClick={()=>{buttonClickHandler(data)}}>+</button>
        </div>
    )
    }

}
export {PokemonCard};