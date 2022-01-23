import { defaultState } from '../store';
import { USER_AUTH_LOGIN_SUCCESS, USER_AUTH_LOGOUT } from './userConstants';

export function authReducer(authState = defaultState.auth, action) {
  switch (action.type) {
    case USER_AUTH_LOGIN_SUCCESS:
      return true;
    case USER_AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}
