import ReactDOM from "react-dom";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function Modal(props) {
	const { theme } = useContext(ThemeContext);
	const rootModalElement = document.getElementById("root-modal");

	return ReactDOM.createPortal(
		<>
			<div
				className="modal"
				style={{ backgroundColor: theme.boxbg, border: theme.border }}
			>
				<p style={{ color: theme.foreground }}>
					You added {props.name} to your favorites list!
				</p>
				<button
					onClick={props.hideModal}
					style={{ color: theme.foreground, backgroundColor: theme.background }}
					className="btn"
				>
					OK
				</button>
			</div>
			<div onClick={props.hideModal} className="backdrop" />
		</>,
		rootModalElement
	);
}
