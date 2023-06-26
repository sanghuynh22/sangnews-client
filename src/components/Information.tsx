import React from "react";
import { FastNews } from "../type";

const Information: React.FC<any> = ({
	flag,
	translate,
	previous,
	consensus,
	actual,
	date,
}) => {
	return (
		<div className="infor">
			<div className="infor_time">
				<p className="infor_time_p">{date || ""}</p>
			</div>
			<div className="infor_content">
				<img src={flag} className="infor_content_img" />
				<p className="infor_content_p">{translate || ""}</p>
			</div>
			<div className="infor_bottom">
				<div className="infor_bottom_option">
					<p className="infor_bottom_p">
						Trước đó:<span className="infor_bottom_span">{previous}</span>
					</p>
				</div>
				<div className="infor_bottom_option">
					<p className="infor_bottom_p">
						Kỳ vọng:<span className="infor_bottom_span">{consensus}</span>
					</p>
				</div>
				<div className="infor_bottom_option">
					<p className="infor_bottom_p">
						Thực tế:<span className="infor_bottom_span">{actual}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Information;
