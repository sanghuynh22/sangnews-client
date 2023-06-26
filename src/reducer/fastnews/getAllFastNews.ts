import {
	GET_ALL_FASTNEWS_REQUEST,
	GET_ALL_FASTNEWS_SUCCESS,
	GET_ALL_FASTNEWS_FAILURE,
} from "../../actions/fastNews/getAllFastNews";

interface NewsState {
	loading: boolean;
	fastNews: any[] | null;
	error: string | null;
}

const initialState: NewsState = {
	loading: false,
	fastNews: null,
	error: null,
};

const getAllFastNewsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_ALL_FASTNEWS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GET_ALL_FASTNEWS_SUCCESS:
			return {
				...state,
				loading: false,
				fastNews: action.payload,
			};
		case GET_ALL_FASTNEWS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getAllFastNewsReducer;
