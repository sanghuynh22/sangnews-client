import React from "react";
import moment from "moment";
const FastNew: React.FC<any> = ({ content, date }) => {
	return (
		<div className="infor" style={{ backgroundColor: "#282c34" }}>
			<div className="infor_time">
				<p className="infor_time_p">{moment(date).format("HH:mm:ss")}</p>
			</div>
			<div
				className="fastnews_content"
				style={{ padding: "10px 15px", fontSize: "15px", fontWeight: "600" }}
			>
				<p className="fastnews_content_p">{content}</p>
			</div>
		</div>
	);
};

export default FastNew;
