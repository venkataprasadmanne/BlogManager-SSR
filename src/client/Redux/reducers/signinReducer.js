import {
  SIGN_IN_START,
  SIGN_IN_END,
  SIGN_IN_ERROR,
  SIGN_IN_UNMOUNT
} from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_START:
      return { ...state, token: null, loading: true };
    case SIGN_IN_END:
      return { ...state, loading: false, token: action.token };
    case SIGN_IN_ERROR:
      return { ...state, loading: false, error: true, token: null };
    case SIGN_IN_UNMOUNT:
      return {};
    default:
      return state;
  }
};
