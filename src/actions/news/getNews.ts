import axios from "axios";
import { News } from "../../type";

// Khai báo constant cho action types
export const GET_NEWS_REQUEST: string = "GET_NEWS_REQUEST";
export const GET_NEWS_SUCCESS: string = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE: string = "GET_NEWS_FAILURE";

// Hàm action creator cho các action types
export const getNewsRequest = () => ({
	type: GET_NEWS_REQUEST,
});

export const getNewsSuccess = (news: any) => ({
	type: GET_NEWS_SUCCESS,
	payload: news,
});

export const getNewsFailure = (error: string) => ({
	type: GET_NEWS_FAILURE,
	payload: error,
});

export const getNews = (id: number): any => {
	return (dispatch: any) => {
		dispatch(getNewsRequest());
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_API_URL}/news/${id}`)
				.then((response) => {
					dispatch(getNewsSuccess(response.data));
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(getNewsFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
