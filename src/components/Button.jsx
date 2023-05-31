import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";



const Button = (props) =>{

    const {theme} = useContext(ThemeContext)

    if(props.search){
        return(
            <button style={{backgroundColor: theme.backgroundColor, color: theme.linkcolor, marginLeft:"1em", marginRight:"1em"}} onClick={props.onClick}>{props.children}</button>
        )
    }

    return(
        <button style={{backgroundColor: props.bgcolor}} onClick={props.onClick}>{props.children}</button>
    )

}
export {Button};