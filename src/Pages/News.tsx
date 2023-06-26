import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import New from "../components/New";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../actions/news/getAllNews";

const News = () => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState<string>("");
	const { news } = useSelector((state: any) => state.news.getAllNews);
	const [searchDate, setSearchDate] = useState<string>(
		new Date().toISOString().substr(0, 10)
	);

	useEffect(() => {
		dispatch(getAllNews()).then((res: any) => {});
	}, []);

	const filteredNews = useMemo(() => {
		if (!news) return [];
		return news.filter(
			(singleNews: any) =>
				singleNews.title.toLowerCase().includes(searchText.toLowerCase()) &&
				new Date(singleNews.created_at).getTime() <=
					new Date(searchDate).getTime()
		);
	}, [news, searchText, searchDate]);

	return (
		<div className="container">
			<Header />
			<div className="news_search">
				<div className="news_search_bar">
					<input
						placeholder="Tìm kiếm"
						className="news_search_input"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<AiOutlineSearch className="charts_search_iocn" />
				</div>
				<div className="news_search_date">
					<input
						type="date"
						className="news_search_date"
						value={searchDate}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setSearchDate(event.target.value)
						}
					/>
				</div>
			</div>
			{filteredNews.length === 0 ? (
				<p style={{ textAlign: "center", marginTop: "50px" }}>
					Không có bài viết này
				</p>
			) : (
				filteredNews.map((singleNews: any, i: number) => (
					<New
						key={singleNews.id}
						id={singleNews.id}
						title={singleNews.title}
						created_at={singleNews.created_at}
						image={singleNews.image}
						views={singleNews.views}
					/>
				))
			)}
		</div>
	);
};

export default News;
