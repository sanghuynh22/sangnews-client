import axios from "axios";
import { News } from "../../type";

// Khai báo constant cho action types
export const GET_ALL_NEWS_REQUEST: string = "GET_ALL_NEWS_REQUEST";
export const GET_ALL_NEWS_SUCCESS: string = "GET_ALL_NEWS_SUCCESS";
export const GET_ALL_NEWS_FAILURE: string = "GET_ALL_NEWS_FAILURE";

// Hàm action creator cho các action types
export const getAllNewsRequest = () => ({
	type: GET_ALL_NEWS_REQUEST,
});

export const getAllNewsSuccess = (news: any) => ({
	type: GET_ALL_NEWS_SUCCESS,
	payload: news,
});

export const getAllNewsFailure = (error: string) => ({
	type: GET_ALL_NEWS_FAILURE,
	payload: error,
});

export const getAllNews = (): any => {
	return (dispatch: any) => {
		dispatch(getAllNewsRequest());
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_API_URL}/news`)
				.then((response) => {
					dispatch(getAllNewsSuccess(response.data));
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(getAllNewsFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
