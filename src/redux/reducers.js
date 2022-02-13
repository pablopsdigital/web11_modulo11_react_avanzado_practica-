import {
  UI_RESET_ERROR,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_FAIL,
  ADVERT_LOADED_TAGS_SUCCESS,
  ADVERTS_SET_FILTERS,
  ADVERTS_DELETE_FILTERS,
  ADVERT_DELETED_SUCCESS
} from './constants';

export const defaultState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
    tags: []
  },
  ui: {
    isLoading: false,
    error: null
  },
  filters: {}
};

export function auth(authState = defaultState.auth, action) {
  switch (action.type) {
    case USER_AUTH_LOGIN_REQUEST:
      return authState;
    case USER_AUTH_LOGIN_SUCCESS:
      return true;
    case USER_AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}

export function adverts(advertsState = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { ...advertsState, loaded: true, data: action.payload };
    case ADVERT_LOADED_TAGS_SUCCESS:
      return { ...advertsState, tags: action.payload };
    case ADVERT_LOADED_SUCCESS:
    case ADVERT_CREATED_SUCCESS:
      return { ...advertsState, data: [...advertsState.data, action.payload] };
    case ADVERT_DELETED_SUCCESS:
      return {
        ...advertsState,
        data: advertsState.data.filter((advert) => advert.id !== action.payload)
      };
    default:
      return advertsState;
  }
}

export function filters(filtersState = defaultState.filters, action) {
  switch (action.type) {
    case ADVERTS_SET_FILTERS:
      return action.payload;
    case ADVERTS_DELETE_FILTERS:
      return action.payload;
    default:
      return filtersState;
  }
}

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case ADVERTS_LOADED_REQUEST:
    case USER_AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case USER_AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
      return { isLoading: false, error: null };
    case ADVERTS_LOADED_FAIL:
    case USER_AUTH_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
