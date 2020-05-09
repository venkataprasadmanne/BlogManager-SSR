import {
  POST_ARTICLE_START,
  POST_ARTICLE_END,
  POST_ARTICLE_ERROR,
  POST_ARTICLE_UNMOUNT
} from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case POST_ARTICLE_START:
      return { ...state, loading: true, error: false, article: null };
    case POST_ARTICLE_END:
      return {
        ...state,
        article: action.article,
        loading: false,
        error: false
      };
    case POST_ARTICLE_ERROR:
      return { ...state, loading: false, error: true, article: null };
    case POST_ARTICLE_UNMOUNT:
      return {};
    default:
      return state;
  }
};
