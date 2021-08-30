import { ERROR, AUTH, LOGOUT } from "../actions/auth";

const initialState = {
  data: {},
  token: null,
  userId: null,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    case ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
