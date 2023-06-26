import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user/loginUser";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../actions/user/getAllUser";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { userList } = useSelector((state: any) => state.user.getAllUser);
	useEffect(() => {
		dispatch(getAllUser()).then(() => {});
	}, []);
	const handleClickLogin = () => {
		if (name && password) {
			dispatch(loginUser(name, password)).then(() => {
				setName("");
				setPassword("");
				navigate("/");
			});
			console.log("name: ", name);
			console.log("password: ", password);
		} else {
			alert(`Hãy nhập đầy đủ thông tin`);
		}
	};
	const handleClickLoginFast = (name: string, password: string) => {
		dispatch(loginUser(name, password)).then(() => {
			navigate("/");
		});
	};
	return (
		<div className="login">
			<div className="login_left">
				<div className="login_left_options">
					<p className="login_left_options_p">Admin (create được cả 2):</p>
					<div className="login_left_option_container">
						{userList
							.filter((user: any) => user.role == "admin")
							.map((user: any) => (
								<div
									className="login_left_option"
									key={user.id}
									onClick={() => handleClickLoginFast(user.name, user.password)}
								>
									<p className="login_left_name">{user.name}</p>
								</div>
							))}
					</div>
				</div>
				<div className="login_left_options">
					<p className="login_left_options_p">Editor (chỉ create được news):</p>
					<div className="login_left_option_container">
						{userList
							.filter((user: any) => user.role == "editor")
							.map((user: any) => (
								<div
									className="login_left_option"
									key={user.id}
									onClick={() => handleClickLoginFast(user.name, user.password)}
								>
									<p className="login_left_name">{user.name}</p>
								</div>
							))}
					</div>
				</div>
				<div className="login_left_options">
					<p className="login_left_options_p">guest (không được vào create):</p>
					<div className="login_left_option_container">
						{userList
							.filter((user: any) => user.role == "guest")
							.map((user: any) => (
								<div
									className="login_left_option"
									key={user.id}
									onClick={() => handleClickLoginFast(user.name, user.password)}
								>
									<p className="login_left_name">{user.name}</p>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className="login_right">
				<div className="login_right_container">
					<div className="login_right_option">
						<input
							type="text"
							className="login_right_input"
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="login_right_option">
						<input
							type="password"
							className="login_right_input"
							placeholder="Mật khẩu"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="login_right_button" onClick={handleClickLogin}>
						<p className="login_right_button_p">Đăng nhập</p>
					</div>
				</div>
				<div className="login_footer">
					<p className="login_footer_p">@SangHuynh</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
