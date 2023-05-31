import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const getData = async () => {
			setError(undefined);
			try {
				const response = await axios.get(`${url}`);
				setData(response.data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);
	return { data, loading, error };
};
