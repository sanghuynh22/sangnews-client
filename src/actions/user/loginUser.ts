import { Dispatch } from "redux";
import { setCurrentUser } from "./currentUser";
import { User } from "../../type";
import axios from "axios";
import { ThunkAction } from "redux-thunk";

export const LOGIN_USER_REQUEST: string = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: string = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE: string = "LOGIN_USER_FAILURE";

export const loginUserRequest = () => ({
	type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (user: User) => ({
	type: LOGIN_USER_SUCCESS,
	payload: user,
});

export const loginUserFailure = (error: string) => ({
	type: LOGIN_USER_FAILURE,
	payload: error,
});

export const loginUser = (name: string, password: string): any => {
	return async (dispatch: Dispatch) => {
		dispatch(loginUserRequest());

		try {
			if (!name || !password) {
				throw new Error("Username and password are required");
			}

			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/users/login`,
				{ name, password },
				{
					withCredentials: true,
				}
			);
			const user = response.data;
			dispatch(setCurrentUser(user));
			dispatch(loginUserSuccess(user));
			return Promise.resolve(user);
		} catch (error: any) {
			const errorMsg: string = error.message || "An error occurred";
			dispatch(loginUserFailure(errorMsg));
			return Promise.reject(errorMsg);
		}
	};
};
