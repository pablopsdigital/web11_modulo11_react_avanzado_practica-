import CustomLocalStorageManager from '../utils/CustomLocalStorageManager';
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
  ADVERT_DELETED_FAIL,
  ADVERT_LOADED_TAGS_REQUEST,
  ADVERT_LOADED_TAGS_SUCCESS,
  ADVERT_LOADED_TAGS_FAIL,
  ADVERTS_SET_FILTERS,
  ADVERTS_DELETE_FILTERS
} from './constants';

import { areAdvertsLoaded, getAdverts } from './selectors';

export function loadAdverts() {
  return async function (dispatch, getState, { api, history }) {
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
      if (error.status === 404) {
        history.push('/404');
      }
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

export function loadTags() {
  return async function (dispatch, getState, { api }) {
    dispatch({ type: ADVERT_LOADED_TAGS_REQUEST });
    try {
      const tags = await api.getAllTags();
      dispatch({
        type: ADVERT_LOADED_TAGS_SUCCESS,
        payload: tags
      });
    } catch (error) {
      dispatch({ type: ADVERT_LOADED_TAGS_FAIL, error: true, payload: error });
    }
  };
}

export function createAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    dispatch({ type: ADVERT_CREATED_REQUEST });
    try {
      const newAdvert = await api.createAdvertisement(advert);
      const createdTweet = await api.getAdvertisementId(newAdvert.id);
      dispatch({
        type: ADVERT_CREATED_SUCCESS,
        payload: createdTweet
      });
      history.replace(`/adverts/${createdTweet.id}`);
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
      await api.deleteAdvertisementId(advertId);
      dispatch({
        type: ADVERT_DELETED_SUCCESS
      });
      loadAdverts();
      history.push('/');
    } catch (error) {
      dispatch({ type: ADVERT_DELETED_FAIL, error: true, payload: error });
    }
  };
}

export function createFilters(filters) {
  return async function (dispatch) {
    CustomLocalStorageManager.setItem('filters', filters);
    dispatch({
      type: ADVERTS_SET_FILTERS,
      payload: filters
    });
  };
}

export function deleteFilters(filters) {
  return async function (dispatch, getState, { api, history }) {
    CustomLocalStorageManager.removeItem('filters');
    dispatch({
      type: ADVERTS_DELETE_FILTERS,
      payload: {}
    });
  };
}

export function authLogin(credentials) {
  return async function (dispatch, getState, { api, history }) {
    dispatch({ type: USER_AUTH_LOGIN_REQUEST });
    try {
      await api.login(credentials);
      dispatch({
        type: USER_AUTH_LOGIN_SUCCESS
      });
      history.push('/adverts');
    } catch (error) {
      dispatch({ type: USER_AUTH_LOGIN_FAIL, error: true, payload: error });
    }
  };
}

export function authLogout() {
  return async function (dispatch, getState, { api, history }) {
    await api.logout();
    dispatch({ type: USER_AUTH_LOGOUT, payload: false });
    history.push('/login');
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR
  };
}
