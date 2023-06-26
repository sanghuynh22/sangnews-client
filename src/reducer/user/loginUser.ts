import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE} from "../../actions/user/loginUser";
import {User} from "../../type";

interface LoginUserRequestAction {
  type: typeof LOGIN_USER_REQUEST;
}

interface LoginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  payload: User; // giả sử UserType là kiểu dữ liệu của user.
}

interface LoginUserFailureAction {
  type: typeof LOGIN_USER_FAILURE;
  payload: string; 
}

type LoginUserActionTypes = LoginUserRequestAction | LoginUserSuccessAction | LoginUserFailureAction;

interface LoginUserState {
  isLogin: boolean;
  user: User | null;
  error: string | null;
}

const initialState: LoginUserState = {
  isLogin: false,
  user: null,
  error: null,
};

const loginUserReducer = (state = initialState, action: LoginUserActionTypes): LoginUserState => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        const loginRequestAction = action as LoginUserRequestAction;
        return {
          ...state,
          isLogin: true,
        };
      case LOGIN_USER_SUCCESS:
        const loginSuccessAction = action as LoginUserSuccessAction;
        return {
          ...state,
          isLogin: false,
          user: loginSuccessAction.payload,
        };
      case LOGIN_USER_FAILURE:
        const loginFailureAction = action as LoginUserFailureAction;
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
