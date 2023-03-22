import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  PREMIUM_PURCHASE,
  PREMIUM_END,
} from "../Types";

const initialState = {
  isAuthenticated: false,
  msg: null,
  user: null,
};


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case PREMIUM_PURCHASE:
    case PREMIUM_END:
      return {
        ...state,
        isAuthenticated: true,
        msg: "Login Successfully",
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case CLEAR_AUTH_MSG:
      return {
        ...state,
        isAuthenticated: false,
        msg: "Logout",
        user: null,
      };
    default:
      return state;
  }
}
