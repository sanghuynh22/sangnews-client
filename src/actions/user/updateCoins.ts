import axios from "axios";
import { User } from "../../type";

// Khai báo constant cho action types
export const UPDATE_COINS_USER_REQUEST: string = "UPDATE_COINS_USER_REQUEST";
export const UPDATE_COINS_USER_SUCCESS: string = "UPDATE_COINS_USER_SUCCESS";
export const UPDATE_COINS_USER_FAILURE: string = "UPDATE_COINS_USER_FAILURE";

// Hàm action creator cho các action types
export const updateCoinsUserRequest = () => ({
	type: UPDATE_COINS_USER_REQUEST,
});

export const updateCoinsUserSuccess = () => ({
	type: UPDATE_COINS_USER_SUCCESS,
});

export const updateCoinsUserFailure = (error: string) => ({
	type: UPDATE_COINS_USER_FAILURE,
	payload: error,
});

export const updateCoinsUser = (amount: number, id_user: number): any => {
	return (dispatch: any) => {
		dispatch(updateCoinsUserRequest());
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_URL}/users/updateCoin`, {
					amount,
					id_user,
				})
				.then((response) => {
					dispatch(updateCoinsUserSuccess());
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(updateCoinsUserFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
