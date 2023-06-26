import React, { useEffect } from "react";
import Header from "../components/Header";
import New from "../components/New";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../actions/news/getAllNews";

const MostView = () => {
	const dispatch = useDispatch();
	const { news } = useSelector((state: any) => state.news.getAllNews);
	useEffect(() => {
		dispatch(getAllNews()).then(() => {});
	}, []);
	return (
		<div className="container">
			<Header />
			<div className="mostview">
				{news
					?.sort((a: any, b: any) => {
						return b.views - a.views;
					})
					.map((item: any, i: number) => (
						<New
							key={item?.id}
							id={item?.id}
							title={item?.title}
							created_at={item?.created_at}
							image={item?.image}
							views={item?.views || 0}
						/>
					))}
			</div>
		</div>
	);
};

export default MostView;
