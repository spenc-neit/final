import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import store from "../store/store";
import { getTypeString } from "../functions/getTypeString";

const FavoritesCard = (props) => {
	const { theme } = useContext(ThemeContext);

	const newUrl = props.url.replace("-species/", "/"); //prep url

	const { data } = useFetch(newUrl);

	const buttonClickHandler = (newItem) => {
		store.dispatch({
			type: "REMOVE_ITEM",
			payload: {
				value: String(newItem.id),
			},
		});
	};

	if (data.length != 0) {
		return (
			<div
				className="box"
				style={{
					backgroundColor: theme.boxbg,
					border: theme.border,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						src={data.sprites.front_default}
						alt={data.species.name}
						style={{ height: "10em" }}
					/>{" "}
					&nbsp; &nbsp;
					<div>
						<Link
							to={"../pokemon/" + data.id}
							style={{
								color: theme.linkcolor,
								display: "inline-block",
								fontSize: "2.5em",
							}}
						>
							{data.species.name.charAt(0).toUpperCase() +
								data.species.name.slice(1)}
						</Link>
						<p style={{ fontSize: "1.5em" }}>
							Type: {getTypeString(data.types)}
						</p>
					</div>
				</div>
				<button
					style={{
						backgroundColor: theme.background,
						color: theme.linkcolor,
						border: theme.border,
					}}
					onClick={() => {
						buttonClickHandler(data);
					}}
				>
					x
				</button>
			</div>
		);
	}
};
export { FavoritesCard };
