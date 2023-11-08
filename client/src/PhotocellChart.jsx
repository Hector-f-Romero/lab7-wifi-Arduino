import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
		},
		labels: {
			color: "#fff",
		},
		title: {
			display: true,
			text: "Cantidad de luz registrada por la fotocelda",
			color: "#fff",
		},
	},
	scales: {
		y: {
			ticks: {
				color: "#fff",
			},
			title: {
				display: true,
				text: "Número de registros",
				color: "#fff",
			},
		},
		x: {
			ticks: {
				color: "#fff",
			},
			title: {
				display: true,
				text: "Leds encendidos",
				color: "#fff",
			},
		},
	},
};

const socket = io(import.meta.env.VITE_URL_BACKEND);

const PhotocellChart = () => {
	const [photoCellValues, setPhotoCellValues] = useState([]);

	const dataChart = {
		labels: photoCellValues.map((item) => `${item.number_leds} leds`),
		datasets: [
			{
				label: "Cantidad leds encendidos",
				data: photoCellValues.map((item) => item.count),
				backgroundColor: "#8aff63",
			},
		],
	};

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/leds`);

			setPhotoCellValues(res.data.values);
			console.log(res.data.values);
		};

		// Save in the state the new data when a new value has been inserted in DB.
		socket.on("new-data", (payload) => {
			setPhotoCellValues(payload.data);
		});

		getData();
	}, []);

	return (
		<div className="chart">
			<Bar options={options} data={dataChart} />
		</div>
	);
};

export default PhotocellChart;
