import axios from "axios";
import { User } from "../../type";
import { setCurrentUser } from "./currentUser";

// Khai báo constant cho action types
export const LOGOUT_USER_REQUEST: string = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS: string = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE: string = "LOGOUT_USER_FAILURE";

// Hàm action creator cho các action types
export const logoutUserRequest = () => ({
	type: LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = () => ({
	type: LOGOUT_USER_SUCCESS,
});

export const logoutUserFailure = (error: string) => ({
	type: LOGOUT_USER_FAILURE,
	payload: error,
});

export const logoutUser = (): any => {
	return (dispatch: any) => {
		dispatch(logoutUserRequest());
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/users/logout`,
					{},
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					dispatch(setCurrentUser(null));
					dispatch(logoutUserSuccess());
					resolve(response.data); // resolve with data if needed
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(logoutUserFailure(errorMsg));
					reject(errorMsg); // reject with error message
				});
		});
	};
};
