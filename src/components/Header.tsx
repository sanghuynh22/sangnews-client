import React from "react";
import logo from "../assets/logo.jpeg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
	const location = useLocation();
	const { currentUser } = useSelector((state: any) => state.user.currentUser);
	return (
		<div className="header">
			<Link
				to={"/"}
				className={`header_option ${location.pathname === "/" && "active"}`}
			>
				<img src={logo} className="header_logo" />
				<p className="header_logo_p">Sang News</p>
			</Link>
			<Link
				to={"/charts"}
				className={`header_option ${
					location.pathname === "/charts" && "active"
				}`}
			>
				<p className="header_option_p">Thị trường</p>
			</Link>
			<Link
				to="/news"
				className={`header_option ${location.pathname === "/news" && "active"}`}
			>
				<p className="header_option_p">Tin tức</p>
			</Link>
			<Link
				to="/schedule"
				className={`header_option ${
					location.pathname === "/schedule" && "active"
				}`}
			>
				<p className="header_option_p">Lịch Kinh tế</p>
			</Link>
			<Link
				to="/mostview"
				className={`header_option ${
					location.pathname === "/mostview" && "active"
				}`}
			>
				<p className="header_option_p">Xem nhiều nhất</p>
			</Link>
			<Link
				to="/fastnews"
				className={`header_option ${
					location.pathname === "/fastnews" && "active"
				}`}
			>
				<p className="header_option_p">Thông tin nhanh</p>
			</Link>
			{currentUser && (
				<Link
					to="/coin"
					className={`header_option ${
						location.pathname === "/coin" && "active"
					}`}
				>
					<p className="header_option_p">SimCoin</p>
				</Link>
			)}
		</div>
	);
};

export default Header;
