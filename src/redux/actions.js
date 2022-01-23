import {
  UI_RESET_ERROR,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGOUT,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_FAIL,
  ADVERT_LOADED_REQUEST,
  ADVERT_CREATED_FAIL,
  ADVERT_LOADED_FAIL,
  ADVERT_CREATED_REQUEST,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAIL
} from './constants';

import { areAdvertsLoaded, getAdverts } from './selectors';

export function uiResetError() {
  return {
    type: UI_RESET_ERROR
  };
}

export function loadAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch({ type: ADVERTS_LOADED_REQUEST });
    try {
      const adverts = await api.getAdvertisements();
      dispatch({
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts
      });
    } catch (error) {
      dispatch({ type: ADVERTS_LOADED_FAIL, error: true, payload: error });
    }
  };
}

export function loadAdvert(advertId) {
  return async function (dispatch, getState, { api, history }) {
    const advert = getAdverts(getState(), advertId);
    if (advert) {
      return;
    }
    dispatch({ type: ADVERT_LOADED_REQUEST });
    try {
      const advert = await api.getAdvertisementId(advertId);
      dispatch({
        type: ADVERT_LOADED_SUCCESS,
        payload: advert
      });
    } catch (error) {
      dispatch({ type: ADVERT_LOADED_FAIL, error: true, payload: error });
      if (error.status === 404) {
        history.push('/404');
      }
    }
  };
}

export function createAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    dispatch({ type: ADVERT_CREATED_REQUEST });
    try {
      const newAdvert = await api.createAdvertisement(advert);
      const createdTweet = await api.getAdvertisementId(newAdvert.id);
      console.log(createdTweet);
      dispatch({
        type: ADVERT_CREATED_SUCCESS,
        payload: createdTweet
      });
      history.push(`/adverts/${createdTweet.id}`);
      //TODO: redirect to new advert not found
    } catch (error) {
      dispatch({ type: ADVERT_CREATED_FAIL, error: true, payload: error });
      if (error.status === 401) {
        history.push('/login');
      }
    }
  };
}

export function deleteAdvert(advertId) {
  return async function (dispatch, getState, { api, history }) {
    dispatch({ type: ADVERT_DELETED_REQUEST });
    try {
      const advert = await api.deleteAdvertisementId(advertId);
      dispatch({
        type: ADVERT_DELETED_SUCCESS,
        payload: advert
      });
    } catch (error) {
      dispatch({ type: ADVERT_DELETED_FAIL, error: true, payload: error });
    }
  };
}

export function authLogin(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch({ type: USER_AUTH_LOGIN_REQUEST });
    try {
      const token = await api.login(credentials);
      dispatch({
        type: USER_AUTH_LOGIN_SUCCESS,
        payload: token
      });
      const { from } = history.location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      dispatch({ type: USER_AUTH_LOGIN_FAIL, error: true, payload: error });
    }
  };
}

export function authLogout() {
  return {
    type: USER_AUTH_LOGOUT
  };
}
