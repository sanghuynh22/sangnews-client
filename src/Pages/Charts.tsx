import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import ChartItem from "../components/ChartItem";

const Charts = () => {
	const [cryptoList, setCryptoList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesToShow, setPagesToShow] = useState([1, 2, 3, 4, 5]);

	useEffect(() => {
		async function fetchCryptoList() {
			const response = await axios.get(
				`${process.env.REACT_APP_CHART_API}/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}`
			);

			setCryptoList(response.data);

			// Calculate pages to show based on current page
			if (currentPage <= 3) {
				setPagesToShow([1, 2, 3, 4, 5]);
			} else if (currentPage >= 8) {
				setPagesToShow([6, 7, 8, 9, 10]);
			} else {
				setPagesToShow([
					currentPage - 2,
					currentPage - 1,
					currentPage,
					currentPage + 1,
					currentPage + 2,
				]);
			}
			// console.log("data: ", response.data);
		}

		fetchCryptoList();
	}, [currentPage]);

	return (
		<div className="container">
			<Header />
			<div className="charts_search">
				<input placeholder="Tìm kiếm" className="charts_search_input" />
				<AiOutlineSearch className="charts_search_iocn" />
			</div>
			<table>
				<thead>
					<tr style={{ zIndex: "100" }}>
						<th style={{ textAlign: "center" }}>#</th>
						<th>Tên</th>
						<th>Giá trị (USD)</th>
						<th style={{ textAlign: "right" }}>Tỉ lệ thay đổi (24h)</th>
						<th style={{ textAlign: "right" }}>Khối lượng giao dịch</th>
						<th style={{ textAlign: "right" }}>Vốn hóa</th>
						<th style={{ textAlign: "center", zIndex: "100" }}>Biểu đồ</th>
					</tr>
				</thead>
				<tbody>
					{cryptoList.map((crypto: any, i) => (
						<tr key={crypto.id}>
							<td style={{ textAlign: "center" }}>
								{(currentPage - 1) * 10 + i + 1}
							</td>
							<td
								style={{
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									gap: "10px",
								}}
							>
								<img src={crypto.image} alt={crypto.name} className="tb_img" />
								<p>{crypto.name}</p>
							</td>
							<td>{crypto.current_price.toLocaleString("de-De")}</td>
							<td style={{ textAlign: "right" }}>
								{crypto.price_change_percentage_24h.toFixed(2)}%
							</td>
							<td style={{ textAlign: "right" }}>
								{crypto.total_volume.toLocaleString("de-De")}
							</td>
							<td style={{ textAlign: "right" }}>
								{crypto.market_cap.toLocaleString("de-De")} USD
							</td>
							<td style={{ textAlign: "center" }}>
								<ChartItem crypto={crypto} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="pagination">
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					Previous
				</button>
				{pagesToShow.map((page) => (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={page === currentPage ? "active" : ""}
					>
						{page}
					</button>
				))}
				<button
					disabled={currentPage === 10}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next
				</button>
			</div>
			<div className="home_footer">@SangHuynh</div>
		</div>
	);
};

export default Charts;
