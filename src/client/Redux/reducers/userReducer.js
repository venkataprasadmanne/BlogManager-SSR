import {
  SIGN_UP_START,
  SIGN_UP_END,
  SIGN_UP_ERROR,
  SIGN_UP_UNMOUNT
} from "../actions";

export default (state = { data: {} }, action) => {
  switch (action.type) {
    case SIGN_UP_START:
      return { ...state, loading: true, data: {}, error: false, token: null };
    case SIGN_UP_END:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: true,
        token: action.token
      };
    case SIGN_UP_ERROR:
      return { ...state, data: {}, loading: false, error: true, token: null };
    case SIGN_UP_UNMOUNT:
      return { ...state, data: {}, loading: false, error: false, token: null };
    default:
      return state;
  }
};
