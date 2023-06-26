import React, { useEffect } from "react";
import Header from "../components/Header";
import Information from "../components/Information";
import { useDispatch, useSelector } from "react-redux";
import { getAllFastNews } from "../actions/fastNews/getAllFastNews";
import moment from "moment";
import FastNew from "../components/FastNew";
interface NewsData {
	id?: number;
	content: string;
	createdAt: Date; // Modify this field to match the returned date format
}

const FastNews: React.FC = () => {
	const dispatch = useDispatch();
	const { fastNews } = useSelector(
		(state: any) => state.fastnews.getAllFastNews
	);

	useEffect(() => {
		dispatch(getAllFastNews()).then(() => {});
	}, []);

	const newsByDate: Record<string, NewsData[]> = fastNews
		? fastNews.reduce((acc: any, news: any) => {
				const dateStr: string = moment(news.created_at).format("DD/MM/YYYY");
				if (!acc[dateStr]) {
					acc[dateStr] = [];
				}
				acc[dateStr].push({
					content: news.content,
					createdAt: moment(news.created_at).toDate(),
				});
				return acc;
		  }, {} as Record<string, NewsData[]>)
		: {};

	return (
		<div className="container">
			<Header />
			<div className="fastnews">
				{Object.entries(newsByDate).map(([date, newsList]) => (
					<React.Fragment key={date}>
						<div className="fastnew_label_container">
							<p className="fastnews_label">{date}</p>
						</div>
						{newsList.map((news) => (
							<FastNew
								key={news.createdAt}
								date={new Date(news.createdAt)}
								content={news.content}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default FastNews;
