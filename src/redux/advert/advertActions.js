import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_SUCCESS
} from './advertConstants';
import { areAdvertsLoaded, getAdverts } from './advertSelectors';

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
      const adverts = await api.adverts.getLatestAdverts();
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
