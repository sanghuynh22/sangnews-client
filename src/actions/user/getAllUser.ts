import { Dispatch } from "redux";
import { setCurrentUser } from "./currentUser";
import { User } from "../../type";
import axios from "axios";

export const GET_ALL_USER_REQUEST: string = "GET_ALL_USER_REQUEST";
export const GET_ALL_USER_SUCCESS: string = "GET_ALL_USER_SUCCESS";
export const GET_ALL_USER_FAILURE: string = "GET_ALL_USER_FAILURE";

export const getAllUserRequest = () => ({
	type: GET_ALL_USER_REQUEST,
});

export const getAllUserSuccess = (user: User) => ({
	type: GET_ALL_USER_SUCCESS,
	payload: user,
});

export const getAllUserFailure = (error: string) => ({
	type: GET_ALL_USER_FAILURE,
	payload: error,
});

export const getAllUser = (): any => {
	return async (dispatch: Dispatch) => {
		dispatch(getAllUserRequest());

		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/users`
			);
			const user = response.data;
			dispatch(getAllUserSuccess(user));
			return Promise.resolve(user);
		} catch (error: any) {
			const errorMsg: string = error.message || "An error occurred";
			dispatch(getAllUserFailure(errorMsg));
			return Promise.reject(errorMsg);
		}
	};
};
