import { createContext, useState } from "react";

export const themes = {
	light: {
		name: "light",
		foreground: "#242526",
		background: "#fff",
		boxbg: "aliceblue",
		border: "2px solid deepskyblue",
		linkcolor: "dodgerblue",
		detailcolor: "dimgrey",
	},
	dark: {
		name: "dark",
		foreground: "#fff",
		background: "#242526",
		boxbg: "#2b3a57",
		border: "2px solid white",
		linkcolor: "deepskyblue",
		detailcolor: "darkgrey",
	},
	pastel: {
		name: "pastel",
		foreground: "slateblue",
		background: "#f8d7e8",
		boxbg: "#d6eff6",
		border: "2px solid skyblue",
		linkcolor: "dodgerblue",
		detailcolor: "steelblue",
	},
};

// Let our context know what properties to expect
export const ThemeContext = createContext({
	theme: {},
	changeTheme: () => {},
});

export const ThemeProvider = (props) => {
	const [theme, setTheme] = useState(themes.light);
	const changeTheme = (newtheme) => {
		switch (newtheme) {
			case "light":
				setTheme(themes.light);
				break;
			case "dark":
				setTheme(themes.dark);
				break;
			case "pastel":
				setTheme(themes.pastel);
				break;
		}
		//if previous theme was dark, set to light. else, set to dark
	};


	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
};
