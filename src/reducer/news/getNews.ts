import {
	GET_NEWS_REQUEST,
	GET_NEWS_SUCCESS,
	GET_NEWS_FAILURE,
} from "../../actions/news/getNews";

interface NewsState {
	loading: boolean;
	currentNews: any | null;
	error: string | null;
}

const initialState: NewsState = {
	loading: false,
	currentNews: null,
	error: null,
};

const getNewsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_NEWS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GET_NEWS_SUCCESS:
			return {
				...state,
				loading: false,
				currentNews: action.payload,
			};
		case GET_NEWS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getNewsReducer;
