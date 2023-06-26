import {LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE} from "../../actions/user/logoutUser";
import {User} from "../../type";

interface LogoutUserRequestAction {
  type: typeof LOGOUT_USER_REQUEST;
}

interface LogoutUserSuccessAction {
  type: typeof LOGOUT_USER_SUCCESS;
  payload: User; 
}

interface LogoutUserFailureAction {
  type: typeof LOGOUT_USER_FAILURE;
  payload: string; 
}

type LogoutUserActionTypes = LogoutUserRequestAction | LogoutUserSuccessAction | LogoutUserFailureAction;

interface LogoutUserState {
  isLogin: boolean;
  user: User | null;
  error: string | null;
}

const initialState: LogoutUserState = {
  isLogin: false,
  user: null,
  error: null,
};

const loginUserReducer = (state = initialState, action: LogoutUserActionTypes): LogoutUserState => {
    switch (action.type) {
      case LOGOUT_USER_REQUEST:
        const loginRequestAction = action as LogoutUserRequestAction;
        return {
          ...state,
          isLogin: true,
        };
      case LOGOUT_USER_SUCCESS:
        const loginSuccessAction = action as LogoutUserSuccessAction;
        return {
          ...state,
          isLogin: false,
          user: loginSuccessAction.payload,
        };
      case LOGOUT_USER_FAILURE:
        const loginFailureAction = action as LogoutUserFailureAction;
        return {
          ...state,
          isLogin: false,
          error: loginFailureAction.payload,
        };
      default:
        return state;
    }
  };
  
  
export default loginUserReducer;
