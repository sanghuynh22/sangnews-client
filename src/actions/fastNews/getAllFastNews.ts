import axios from "axios";
import { News } from "../../type";

// Khai báo constant cho action types
export const GET_ALL_FASTNEWS_REQUEST: string = "GET_ALL_FASTNEWS_REQUEST";
export const GET_ALL_FASTNEWS_SUCCESS: string = "GET_ALL_FASTNEWS_SUCCESS";
export const GET_ALL_FASTNEWS_FAILURE: string = "GET_ALL_FASTNEWS_FAILURE";

// Hàm action creator cho các action types
export const getAllFastNewsRequest = () => ({
	type: GET_ALL_FASTNEWS_REQUEST,
});

export const getAllFastNewsSuccess = (news: any) => ({
	type: GET_ALL_FASTNEWS_SUCCESS,
	payload: news,
});

export const getAllFastNewsFailure = (error: string) => ({
	type: GET_ALL_FASTNEWS_FAILURE,
	payload: error,
});

export const getAllFastNews = (): any => {
	return (dispatch: any) => {
		dispatch(getAllFastNewsRequest());
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_API_URL}/fastnews`)
				.then((response) => {
					dispatch(getAllFastNewsSuccess(response.data));
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(getAllFastNewsFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
