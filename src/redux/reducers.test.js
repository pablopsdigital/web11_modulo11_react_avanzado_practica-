import { auth, defaultState, adverts } from './reducers';
import {
  USER_AUTH_LOGIN_SUCCESS,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGOUT,
  ADVERTS_LOADED_SUCCESS
} from './constants';

describe('auth', () => {
  test('should manage USER_AUTH_LOGIN_REQUEST', () => {
    const action = { type: USER_AUTH_LOGIN_REQUEST };
    expect(auth(undefined, action)).toBe(false);
  });

  test('should manage USER_AUTH_LOGIN_SUCCESS', () => {
    const action = { type: USER_AUTH_LOGIN_SUCCESS };
    expect(auth(undefined, action)).toBe(true);
  });

  test('should manage USER_AUTH_LOGOUT', () => {
    const action = { type: USER_AUTH_LOGOUT };
    expect(auth(undefined, action)).toBe(false);
  });

  test('should manage default (any action)', () => {
    const initialState = true;
    const action = { type: 'ANY' };
    expect(auth(initialState, action)).toBe(initialState);
  });

  test('should manage any action when initial state in undefined', () => {
    const action = { type: 'ANY' };
    expect(auth(undefined, action)).toBe(defaultState.auth);
  });
});

describe('adverts', () => {
  test('should manage ADVERTS_LOADED_SUCCESS', () => {
    const payload = ['advert1'];
    const action = { type: ADVERTS_LOADED_SUCCESS, payload };
    const expedtedState = {
      loaded: true,
      data: payload,
      tags: []
    };
    expect(adverts(defaultState.adverts, action)).toEqual(expedtedState);
  });
});
