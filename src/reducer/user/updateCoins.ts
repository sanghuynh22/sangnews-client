import {
	UPDATE_COINS_USER_REQUEST,
	UPDATE_COINS_USER_SUCCESS,
	UPDATE_COINS_USER_FAILURE,
} from "../../actions/user/updateCoins";
import { User } from "../../type";

interface UpdateCoinsUserRequestAction {
	type: typeof UPDATE_COINS_USER_REQUEST;
}

interface UpdateCoinsUserSuccessAction {
	type: typeof UPDATE_COINS_USER_SUCCESS;
	payload: User;
}

interface UpdateCoinsUserFailureAction {
	type: typeof UPDATE_COINS_USER_FAILURE;
	payload: string;
}

type UpdateCoinsUserActionTypes =
	| UpdateCoinsUserRequestAction
	| UpdateCoinsUserSuccessAction
	| UpdateCoinsUserFailureAction;

interface CoinsUserState {
	isUpdating: boolean;
	user: User | null;
	error: string | null;
}

const initialState: CoinsUserState = {
	isUpdating: false,
	user: null,
	error: null,
};

const updateCoinsUserReducer = (
	state = initialState,
	action: UpdateCoinsUserActionTypes
): CoinsUserState => {
	switch (action.type) {
		case UPDATE_COINS_USER_REQUEST:
			const updateRequestAction = action as UpdateCoinsUserRequestAction;
			return {
				...state,
				isUpdating: true,
			};
		case UPDATE_COINS_USER_SUCCESS:
			const updateSuccessAction = action as UpdateCoinsUserSuccessAction;
			return {
				...state,
				isUpdating: false,
				user: updateSuccessAction.payload,
			};
		case UPDATE_COINS_USER_FAILURE:
			const updateFailureAction = action as UpdateCoinsUserFailureAction;
			return {
				...state,
				isUpdating: false,
				error: updateFailureAction.payload,
			};
		default:
			return state;
	}
};

export default updateCoinsUserReducer;
