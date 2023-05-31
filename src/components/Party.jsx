import { useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";

function Party(){

    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        document.body.style.backgroundColor = theme.background;
    }, [theme]);

    return(
        <div style={{color:theme.foreground}}>
            <h2>Party Page</h2>
            <p>Welcome to the store</p>
        </div>
        
    )
}

export default Party;