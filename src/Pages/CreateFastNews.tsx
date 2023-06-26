import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createFastNews } from "../actions/fastNews/createFastNews";

const CreateFastNews = () => {
	const dispatch = useDispatch();
	const [content, setContent] = useState<string>("");
	const { currentUser } = useSelector((state: any) => state.user.currentUser);
	const handleClickCreate = () => {
		dispatch(createFastNews({ content, id_user: currentUser.userId }))
			.then(() => {
				alert(`Đã tạo thành công fastnews với nội dung : ${content}`);
				setContent("");
			})
			.catch((error: any) => {
				const authErr = error.split(" ").indexOf("401");
				if (authErr !== -1) {
					alert("Bạn không có quyền thực hiện chức năng này!");
				}
			});
	};
	return (
		<div className="create-fastnews">
			<Link
				to="/create"
				className="back"
				style={{ position: "absolute", top: "0", left: "0" }}
			>
				<p className="back_p">&lt; Back</p>
			</Link>
			<h2 style={{ margin: "20px 0" }}>Fast News</h2>
			<div className="createnews">
				<div className="createnews_title">
					<textarea
						className="creat-fastenews_textarea"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
			</div>
			<button onClick={handleClickCreate} style={{ marginTop: "60px" }}>
				Create
			</button>
		</div>
	);
};

export default CreateFastNews;
