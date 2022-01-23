import { defaultState } from '../store';
import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS
} from './advertConstants';

export function advertsReducer(advertsState = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case ADVERT_LOADED_SUCCESS:
    case ADVERT_CREATED_SUCCESS:
      return { ...advertsState, data: [...advertsState.data, action.payload] };
    default:
      return advertsState;
  }
}
