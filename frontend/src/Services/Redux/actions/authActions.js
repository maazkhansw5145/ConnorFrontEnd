import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_AUTH_MSG,
  PREMIUM_PURCHASE,
  PREMIUM_END
} from "../Types";
import url from "../../../Config/URL";

export const login = (data) => (dispatch) => {
  console.log(data);
  fetch(`${url}/user/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((response) => {
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    })
  );
};

export const premiumPurchase = (transactionHash, userId) => (dispatch) => {
  fetch(`${url}/premium/purchase/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transactionHash }),
  }).then((res) =>
    res.json().then((response) => {
      console.log(response);
      dispatch({
        type: PREMIUM_PURCHASE,
        payload: response,
      });
    })
  );
};

export const premiumEnd = ( userId) => (dispatch) => {
  fetch(`${url}/premium/end/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) =>
    res.json().then((response) => {
      dispatch({
        type: PREMIUM_END,
        payload: response,
      });
    })
  );
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
