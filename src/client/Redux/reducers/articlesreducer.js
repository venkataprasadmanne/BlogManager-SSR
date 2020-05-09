import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING
} from "../actions";

export default (state = { data: [] }, action) => {
  console.log("action", action);
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...state, data: action.payload, error: false, loading: false };
    case FETCH_ARTICLES_ERROR:
      return { ...state, data: [], error: action.error, loading: false };
    case FETCH_ARTICLES_LOADING:
      return { ...state, data: [], error: false, loading: true };
    default:
      return state;
  }
};
