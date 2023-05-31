import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import store from "../store/store";
import { Modal } from "./Modal";
import { titleCase } from "../functions/titleCase";

const PokemonCard = (props) => {
	const { theme } = useContext(ThemeContext);
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleHideModal = () => {
		setShowModal(false);
	};

	const newUrl = props.url.replace("-species/", "/");

	const { data, loading, error } = useFetch(newUrl);

	if (loading) {
		return (
			<img
				src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
				style={{ height: "50px" }}
			/>
		);
	}

	const modal = showModal ? (
		<Modal hideModal={handleHideModal} name={titleCase(data.species.name)} />
	) : null;

	const buttonClickHandler = (newItem) => {
		let ok = true;
		store.getState().pokemon.map((entry) => {
			if (newItem.id === Number(entry.value)) {
				console.log("is already there");
				ok = false;
			}
		});
		handleShowModal();
		if (ok) {
			store.dispatch({
				type: "ADD_ITEM",
				payload: {
					value: newItem.id,
				},
			});
		}
	};

	if (data.length != 0) {
		return (
			<>
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
							style={{ height: "4em" }}
						/>{" "}
						&nbsp; &nbsp;
						<Link
							to={"../pokemon/" + data.id}
							style={{ color: theme.foreground, display: "inline-block" }}
						>
							{titleCase(data.species.name)}
						</Link>
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
						+
					</button>
				</div>
				{modal}
			</>
		);
	}
};
export { PokemonCard };
