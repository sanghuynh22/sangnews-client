import React from "react";
import { News } from "../type";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
const New: React.FC<News> = ({
	id,
	title,
	content,
	image,
	created_at,
	views,
}) => {
	const navigate = useNavigate();
	const handleClickDetail = () => {
		navigate(`/detail/${id}`);
	};
	return (
		<div className="new_container" onClick={handleClickDetail}>
			<div className="new">
				<img src={image || ""} className="new_img" />

				<div className="new_info">
					<p className="new_info_p">
						{title ||
							"Tin vắn Crypto 30/05: Bitcoin hiện có thể tiếp tục xu hướng tăngcùng tin tức Ripple, OKX, Cardano, Chainlink, Flare, Jimbos 	Protocol, Avalanche, CBDC, Dogecoin, TrigonX"}
					</p>
					<p className="new_info_time">
						{moment(created_at).format("DD/MM/YYYY HH:mm")}
					</p>
					{views ? (
						<p className="new_info_time">lượt xem: {views.toString()}</p>
					) : (
						<p className="new_info_time">lượt xem: 0</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default New;
