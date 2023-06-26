import {
    CREATE_NEWS_REQUEST,
    CREATE_NEWS_SUCCESS,
    CREATE_NEWS_FAILURE,
  } from "../../actions/news/createNews";
  
  interface NewsState {
    loading: boolean;
    news: any | null;
    error: string | null;
  }
  
  const initialState: NewsState = {
    loading: false,
    news: null,
    error: null,
  };
  
  const newsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case CREATE_NEWS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_NEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          news: action.payload,
        };
      case CREATE_NEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default newsReducer;
  