import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
} from "../Types";
import url from "../../../Config/URL";

export const login = (data) => (dispatch) => {
  console.log(data)
  fetch(`${url}/user/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json().then((response) => {
    console.log(response)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });
  }))
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const clearAuthMsg = () => async (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_MSG,
  });
};
