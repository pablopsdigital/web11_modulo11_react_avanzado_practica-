import {
  UI_RESET_ERROR,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGOUT
} from './constants';

import { areAdvertsLoaded, getAdverts } from './selectors';

export function uiResetError() {
  return {
    type: UI_RESET_ERROR
  };
}

export function advertsLoaded(adverts) {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts
  };
}

export function loadAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    // dispatch loadAdvertsRequest
    try {
      const adverts = await api.adverts.getAdvertisements();
      dispatch(advertsLoaded(adverts));
    } catch (error) {
      // dispatch loadAdvertsFailure
    }
  };
}

export function advertLoaded(advert) {
  return {
    type: ADVERT_LOADED_SUCCESS,
    payload: advert
  };
}

export function loadAdvert(advertId) {
  return async function (dispatch, getState, { api, history }) {
    const advert = getAdverts(getState(), advertId);
    if (advert) {
      return;
    }
    // dispatch loadAdvertRequest
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertLoaded(advert));
    } catch (error) {
      // dispatch(loadAdvertFailure(error));
      // if (error.status === 404) {
      //   history.push('/404');
      // }
    }
  };
}

export function advertCreated(advert) {
  return {
    type: ADVERT_CREATED_SUCCESS,
    payload: advert
  };
}

export function createAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    // dispatch createAdvertRequest
    try {
      const newAdvert = await api.adverts.createAdvert(advert);
      // this call is neede because the created advert is incomplete (sparrest)
      const createdAdvert = await api.adverts.getAdvert(newAdvert.id);
      dispatch(advertCreated(createdAdvert));
      history.push(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      // dispatch(createAdvertFailure(error));
      // if (error.status === 401) {
      //   history.push('/login');
      // }
    }
  };
}

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
