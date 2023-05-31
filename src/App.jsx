import { useContext, useState, useEffect } from "react";
import "./App.css";
import {
	useNavigate,
  Outlet,
} from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "./ThemeContext";
import { Button } from "./components/Button";
import { useFetch } from "./hooks/useFetch";

function App() {
  const navigate = useNavigate();
  

  const {changeTheme, theme} = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
  }, [theme]);

  const handleShowHome = () =>{
    navigate("home")
  }

  const handleShowParty = () => {
    navigate("party")
  }

  const themeSelect = (event) =>{
    const val = event.target.value
    changeTheme(val)
  }

  const pokemonBtnClick = () =>{
		navigate("search/")
	}

  

	return (
      <div className="App">
        <div className="navstyling">
          <button className="button" onClick={handleShowHome} style={{backgroundColor:theme.boxbg, color:theme.linkcolor}}>
            Home
          </button>
          <button className="button" onClick={handleShowParty} style={{backgroundColor:theme.boxbg, color:theme.linkcolor}}>
            Party
          </button>

          <div>
            
            <button className="button" onClick={pokemonBtnClick} style={{backgroundColor:theme.boxbg, color:theme.linkcolor}}>
              Search
            </button>
          </div>

          

          <select onChange={themeSelect} style={{backgroundColor:theme.boxbg, color:theme.linkcolor, borderRadius:"8px", border:"0", boxShadow: "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)", fontWeight:"bold", fontFamily:"inherit"}}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="pastel">Pastel</option>
          </select>
        </div>
        <hr />
        <Outlet />
      </div>
	);
}

export default App;
