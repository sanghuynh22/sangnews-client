import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

interface ChartItemProps {
	crypto: any;
}

const ChartItem: React.FC<ChartItemProps> = ({ crypto }) => {
	const [priceData, setPriceData] = useState<[number, number][]>([]);
	const [labels, setLabels] = useState<string[]>([]);
	const [prices, setPrices] = useState<number[]>([]);
	const chartRef = useRef<Chart>();

	useEffect(() => {
		async function fetchPriceData() {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=1&interval=hourly`
			);
			setPriceData(response.data.prices);
		}
		fetchPriceData();
	}, [crypto]);

	useEffect(() => {
		if (priceData.length > 0) {
			const newLabels = [] as string[];
			const newPrices = [] as number[];
			priceData.forEach((p) => {
				const date = new Date(p[0]);
				const hours = date.getHours();
				const minutes = "0" + date.getMinutes();
				newLabels.push(`${hours}:${minutes.substr(-2)}`);
				newPrices.push(p[1]);
			});
			setLabels(newLabels);
			setPrices(newPrices);
		}
	}, [priceData]);

	useEffect(() => {
		if (labels.length > 0 && prices.length > 0) {
			const ctx = document.getElementById(
				`chart-${crypto.id}`
			) as HTMLCanvasElement | null;
			if (ctx) {
				if (chartRef.current) chartRef.current.destroy();
				chartRef.current = new Chart(ctx, {
					type: "line",
					data: {
						labels: labels,
						datasets: [
							{
								label: `${crypto.name} price (USD)`,
								data: prices,
								borderColor: "#3e95cd",
								fill: false,
								pointRadius: 0,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								display: false,
								ticks: {
									display: false,
								},
								grid: {
									display: false,
								},
							},

							y: {
								display: false,
								ticks: {
									display: false,
								},
								grid: {
									display: false,
								},
							},
						},
						plugins: {
							legend: {
								display: false,
							},
						},
						layout: {
							padding: {
								left: 5,
								right: 10,
								top: 15,
								bottom: 15,
							},
						},
					},
				});
			}
		}
	}, [labels, prices, crypto]);

	return (
		<>
			<div className="chart-item">
				<canvas id={`chart-${crypto.id}`} />
			</div>
		</>
	);
};

export default ChartItem;
