import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { titleCase } from "./functions/titleCase";
import { getTypeString } from "./functions/getTypeString";
import { Modal } from "./components/Modal";
import store from "./store/store";

export const PokemonDetail = () => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleHideModal = () => {
		setShowModal(false);
	};

	const buttonClickHandler = (newItem) => {
		let ok = true;
		store.getState().pokemon.map((entry) => {
			if (newItem === entry.value) {
				// console.log("is already there")
				ok = false;
			}
		});
		handleShowModal();
		if (ok) {
			store.dispatch({
				type: "ADD_ITEM",
				payload: {
					value: newItem,
				},
			});
		}
	};

	const formatAbilityName = (name) => {
		let newName = "";
		let splitName = name.split("-");
		if (splitName.length > 1) {
			let second = false;
			splitName.map((entry) => {
				if (second) {
					newName += " " + titleCase(entry);
				} else {
					newName += titleCase(entry);
					second = true;
				}
			});
		} else {
			newName = titleCase(name);
		}
		return newName;
	};

	const getAbilities = (abilityList) => {
		let afterFirst = false;
		return abilityList.map((entry) => {
			let id = entry.ability.url.slice(entry.ability.url.indexOf("y/") + 2);
			if (afterFirst) {
				return (
					<span key={id}>
						{" "}
						or{" "}
						<Link
							style={{ color: `${theme.linkcolor}` }}
							to={"../../ability/" + id}
						>
							{formatAbilityName(entry.ability.name)}
						</Link>
					</span>
				);
			} else {
				afterFirst = true;
				return (
					<span key={id}>
						<Link
							style={{ color: `${theme.linkcolor}` }}
							to={"../../ability/" + id}
						>
							{formatAbilityName(entry.ability.name)}
						</Link>
					</span>
				);
			}
		});
	};
	const { theme } = useContext(ThemeContext);
	const { id } = useParams();
	const { data, loading, error } = useFetch(
		"https://pokeapi.co/api/v2/pokemon/" + id
	);

	const modal = showModal ? (
		<Modal hideModal={handleHideModal} name={titleCase(data.species.name)} />
	) : null;

	if (loading) {
		return (
			<img
				src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
				style={{ height: "50px" }}
			/>
		);
		//if loading is true, then return the element and stop running the code
	}

	// console.log(data.types)

	getTypeString(data.types);

	// console.log(data)
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
				<div
					style={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						color: `${theme.foreground}`,
					}}
				>
					<img
						src={data.sprites.front_default}
						alt={data.species.name}
						style={{ height: "20em" }}
					/>
					<div style={{ width: "85%" }}>
						<h1 style={{ fontSize: "2.5em" }}>
							{titleCase(data.species.name)}
						</h1>
						<p style={{ fontSize: "2em" }}>Type: {getTypeString(data.types)}</p>
						<p style={{ fontSize: "1.5em" }}>
							Ability: {getAbilities(data.abilities)}
						</p>
						<p style={{ fontSize: "1.5em" }}>Stats:</p>
						<table style={{ marginBottom: "2em" }}>
							<tbody>
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
							</tbody>
						</table>
					</div>
					<div style={{ width: "15" }}>
						<p style={{ textAlign: "center", fontSize: "1.5em" }}>No. {id}</p>
						<button
							style={{
								width: "100%",
								color: theme.linkcolor,
								backgroundColor: theme.background,
							}}
							onClick={() => {
								buttonClickHandler(id);
							}}
						>
							Add to favorites
						</button>
					</div>
				</div>
				{modal}
			</div>
			<div id={"root-modal"}></div>
		</>
	);
};
