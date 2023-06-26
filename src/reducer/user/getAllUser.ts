import {
	GET_ALL_USER_REQUEST,
	GET_ALL_USER_SUCCESS,
	GET_ALL_USER_FAILURE,
} from "../../actions/user/getAllUser";
import { User } from "../../type";

interface GetAllUserRequestAction {
	type: typeof GET_ALL_USER_REQUEST;
}

interface GetAllUserSuccessAction {
	type: typeof GET_ALL_USER_SUCCESS;
	payload: User[];
}

interface GetAllUserFailureAction {
	type: typeof GET_ALL_USER_FAILURE;
	payload: string;
}

type GetAllUserActionTypes =
	| GetAllUserRequestAction
	| GetAllUserSuccessAction
	| GetAllUserFailureAction;

interface GetAllUserState {
	isLoading: boolean;
	userList: User[];
	error: string | null;
}

const initialState: GetAllUserState = {
	isLoading: false,
	userList: [],
	error: null,
};

const getAllUserReducer = (
	state = initialState,
	action: GetAllUserActionTypes
): GetAllUserState => {
	switch (action.type) {
		case GET_ALL_USER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_ALL_USER_SUCCESS:
			const successAction = action as GetAllUserSuccessAction;
			return {
				...state,
				isLoading: false,
				userList: successAction.payload,
			};
		case GET_ALL_USER_FAILURE:
			const failureAction = action as GetAllUserFailureAction;
			return {
				...state,
				isLoading: false,
				error: failureAction.payload,
			};
		default:
			return state;
	}
};

export default getAllUserReducer;
