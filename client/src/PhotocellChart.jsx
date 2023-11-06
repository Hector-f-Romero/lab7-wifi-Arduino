import { useEffect, useState } from "react";

import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	// responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Cantidad de luz registrada por la fotocelda",
		},
	},
	scales: {
		y: {
			title: {
				display: true,
				text: "Número de registros",
			},
		},
		x: {
			title: {
				display: true,
				text: "Leds encendidos",
			},
		},
	},
};

const PhotocellChart = () => {
	const [photoCellValues, setPhotoCellValues] = useState([]);

	const dataChart = {
		labels: photoCellValues.map((item) => `${item.number_leds} leds`),
		datasets: [
			{
				label: "Cantidad leds encendidos",
				data: photoCellValues.map((item) => item.count),
				backgroundColor: "rgb(138, 255, 99)",
			},
		],
	};

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/leds`);

			setPhotoCellValues(res.data.values);
			console.log(res.data.values);
		};
		getData();
	}, []);

	return (
		<div className="chart">
			<Bar options={options} data={dataChart} />
		</div>
	);
};

export default PhotocellChart;
