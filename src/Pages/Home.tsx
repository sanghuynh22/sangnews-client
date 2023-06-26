import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import New from "../components/New";
import axios from "axios";
import Chart from "chart.js/auto";
import { getAllNews } from "../actions/news/getAllNews";
import { useDispatch, useSelector } from "react-redux";
import ChartAnnotation from "chartjs-plugin-annotation";
import "chartjs-plugin-crosshair";
import { logoutUser } from "../actions/user/logoutUser";
import { useNavigate } from "react-router-dom";
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [currentPrice, setCurrentPrice] = useState<any>();
	const [dataBTC, setDataBTC] = useState<any>(null);
	const { currentUser } = useSelector((state: any) => state.user.currentUser);
	const { news } = useSelector((state: any) => state.news.getAllNews);
	const chartRef = useRef<HTMLCanvasElement>(null);
	const [chartInstance, setChartInstance] = useState<Chart | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_COINS_API}`)
			.then((response) => {
				setDataBTC(response.data);
				setCurrentPrice(
					response.data.prices[response.data.prices.length - 1][1]
				);
				const ctx = chartRef.current?.getContext("2d");
				if (ctx) {
					const chart = new Chart(ctx, {
						type: "line",
						data: {
							labels: response.data.prices.map((item: any) => {
								const timestamp = item[0];
								const date = new Date(Number(timestamp));
								return date.toLocaleDateString("vi-VN", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								});
							}),
							datasets: [
								{
									label: "Giá Bitcoin",
									data: response.data.prices.map((item: any) => item[1]),
									borderColor: "rgba(0,0,255,1)",
								},
							],
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								x: {
									ticks: {
										maxTicksLimit: 7,
										callback: function (value: any, index: any, values: any) {
											if (response.data.prices[value]) {
												const timestamp = response.data.prices[value][0];
												const date = new Date(Number(timestamp));
												return date.toLocaleDateString("vi-VN", {
													year: "numeric",
													month: "2-digit",
													day: "2-digit",
													hour: "2-digit",
													minute: "2-digit",
												});
											}
										},
										stepSize: 120, // Hiển thị mỗi 2 giờ trên trục x
									},
								},

								y: {
									ticks: {
										callback: function (value: any, index: any, values: any) {
											return "$" + value;
										},
									},
								},
							},
							elements: {
								line: {
									borderWidth: 1,
									tension: 0,
								},
								point: {
									radius: 0,
								},
							},
							plugins: {
								tooltip: {
									// enabled: true,
									intersect: false,
									mode: "index",
									callbacks: {
										label: function (context: any) {
											return `${Math.floor(context.parsed.y)}`;
										},
									},
								},
							},
						},
						plugins: [ChartAnnotation],
					});

					setChartInstance(chart);
				}
			})
			.catch((error) => {});
	}, [news]);

	useEffect(() => {
		dispatch(getAllNews());
	}, []);
	const handleClickLogout = () => {
		dispatch(logoutUser()).then(() => {});
	};
	const handleLogIn = () => {
		navigate("/login");
	};
	return (
		<div className="container">
			<Header />
			<div className="home_info">
				{currentUser ? (
					<>
						<div className="home_info_container">
							<div className="home_info_avatar">
								<p className="home_info_avatar_p">
									{currentUser.name.slice(0, 1)}
								</p>
							</div>
							<p className="home_info_p">{currentUser.name}</p>
						</div>
						<div className="home_info_container" onClick={handleClickLogout}>
							<p
								className="home_info_p"
								style={{ fontSize: "14px", fontWeight: "400" }}
							>
								Đăng xuất
							</p>
						</div>
					</>
				) : (
					<div className="home_info_container" onClick={handleLogIn}>
						<p className="home_info_p">Đăng nhập</p>
					</div>
				)}
			</div>
			<div className="home_price">
				Bitcoin :
				<span className="home_price_span">{Math.floor(currentPrice)} </span>
				USD
			</div>
			<div className="home_chart">
				<canvas ref={chartRef}></canvas>
			</div>
			{news
				?.sort((a: any, b: any) => b.created_at - a.created_at)
				.map((item: any, i: number) => (
					<New
						key={item?.id}
						id={item?.id}
						title={item?.title}
						created_at={item?.created_at}
						image={item?.image}
						views={item?.views}
					/>
				))}
			<div className="home_footer">@SangHuynh</div>
		</div>
	);
};

export default Home;
