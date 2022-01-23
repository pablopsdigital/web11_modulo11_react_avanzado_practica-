import { defaultState } from './store';
import { UI_RESET_ERROR } from './constants';
import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS
} from './advert/advertConstants';

import {
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGOUT
} from './user/userConstants';

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case USER_AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case USER_AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
      return { isLoading: false, error: null };
    case USER_AUTH_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
