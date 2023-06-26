import axios from "axios";
import { News } from "../../type";

// Khai báo constant cho action types
export const CREATE_NEWS_REQUEST: string = "CREATE_NEWS_REQUEST";
export const CREATE_NEWS_SUCCESS: string = "CREATE_NEWS_SUCCESS";
export const CREATE_NEWS_FAILURE: string = "CREATE_NEWS_FAILURE";

// Hàm action creator cho các action types
export const createNewsRequest = () => ({
	type: CREATE_NEWS_REQUEST,
});

export const createNewsSuccess = (news: any) => ({
	type: CREATE_NEWS_SUCCESS,
	payload: news,
});

export const createNewsFailure = (error: string) => ({
	type: CREATE_NEWS_FAILURE,
	payload: error,
});

export const createNews = (data: News): any => {
	return (dispatch: any) => {
		dispatch(createNewsRequest());
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/news`,
					{ ...data, action: "create_news" },
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					dispatch(createNewsSuccess(response.data));
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(createNewsFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
