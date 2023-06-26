import {
	GET_ALL_NEWS_REQUEST,
	GET_ALL_NEWS_SUCCESS,
	GET_ALL_NEWS_FAILURE,
} from "../../actions/news/getAllNews";

interface NewsState {
	loading: boolean;
	news: any[] | null;
	error: string | null;
}

const initialState: NewsState = {
	loading: false,
	news: null,
	error: null,
};

const getAllNewsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_ALL_NEWS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GET_ALL_NEWS_SUCCESS:
			return {
				...state,
				loading: false,
				news: action.payload,
			};
		case GET_ALL_NEWS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllNewsReducer;
