import {
  FETCH_USER_INFO,
  FETCH_ARTICLES_FOR_USER,
  FETCH_ARTICLES_FOR_USER_ERROR,
  FETCH_ARTICLES_FOR_USER_LOADING
} from "../actions";

export default (state = { user: {}, articles: [] }, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return { ...state, user: action.user[0] };
    case FETCH_ARTICLES_FOR_USER:
      return { ...state, articles: action.articles };
    case FETCH_ARTICLES_FOR_USER_ERROR:
      return { ...state, error: action.error };
    case FETCH_ARTICLES_FOR_USER_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
