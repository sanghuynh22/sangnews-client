import {
    CREATE_FASTNEWS_REQUEST,
    CREATE_FASTNEWS_SUCCESS,
    CREATE_FASTNEWS_FAILURE,
  } from "../../actions/fastNews/createFastNews";
  
  interface FastNewsState {
    loading: boolean;
    fastNews: any | null;
    error: string | null;
  }
  
  const initialState: FastNewsState = {
    loading: false,
    fastNews: null,
    error: null,
  };
  
  const fastNewsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case CREATE_FASTNEWS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_FASTNEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          fastNews: action.payload,
        };
      case CREATE_FASTNEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default fastNewsReducer;
  