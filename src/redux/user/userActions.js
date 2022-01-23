import {
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGOUT
} from './userConstants';

export function authLoginRequest() {
  return {
    type: USER_AUTH_LOGIN_REQUEST
  };
}

export function authLoginSuccess() {
  return {
    type: USER_AUTH_LOGIN_SUCCESS
  };
}

export function authLoginFailure(error) {
  return {
    type: USER_AUTH_LOGIN_FAIL,
    error: true,
    payload: error
  };
}

export function authLogin(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export function authLogout() {
  return {
    type: USER_AUTH_LOGOUT
  };
}
