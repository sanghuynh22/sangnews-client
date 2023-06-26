import axios from "axios";
import { FastNews } from "../../type";

export const CREATE_FASTNEWS_REQUEST: string = "CREATE_FASTNEWS_REQUEST";
export const CREATE_FASTNEWS_SUCCESS: string = "CREATE_FASTNEWS_SUCCESS";
export const CREATE_FASTNEWS_FAILURE: string = "CREATE_FASTNEWS_FAILURE";

export const createFastNewsRequest = () => ({
	type: CREATE_FASTNEWS_REQUEST,
});

export const createFastNewsSuccess = (news: any) => ({
	type: CREATE_FASTNEWS_SUCCESS,
	payload: news,
});

export const createFastNewsFailure = (error: string) => ({
	type: CREATE_FASTNEWS_FAILURE,
	payload: error,
});

export const createFastNews = (data: FastNews): any => {
	return (dispatch: any) => {
		dispatch(createFastNewsRequest());
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${process.env.REACT_APP_API_URL}/fastnews`,
					{ ...data, action: "create_fastnews" },
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					dispatch(createFastNewsSuccess(response.data));
					resolve(response.data);
				})
				.catch((error) => {
					const errorMsg: string = error.message;
					dispatch(createFastNewsFailure(errorMsg));
					reject(errorMsg);
				});
		});
	};
};
