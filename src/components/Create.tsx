import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/user/logoutUser";
import { useDispatch, useSelector } from "react-redux";

const Create = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state: any) => state.user.currentUser);
	const handleClickLogout = () => {
		dispatch(logoutUser()).then(() => {
			navigate("/login");
		});
	};
	return (
		<div className="create">
			<div className="create_logout_container">
				<div className="create_logout" onClick={handleClickLogout}>
					<p className="create_logout_p">Đăng xuất</p>
				</div>
				<div className="create_logout">
					<p className="create_logout_p">{currentUser.name}</p>
				</div>
			</div>
			<Link to="/createNews" className="create_option">
				<p className="create_option_p">Create News</p>
			</Link>
			<Link to="/createFastNews" className="create_option">
				<p className="create_option_p">Create Fastnews</p>
			</Link>
		</div>
	);
};

export default Create;
