import { uiResetError, authLogin, createFilters } from './actions';
import {
  ADVERTS_SET_FILTERS,
  UI_RESET_ERROR,
  USER_AUTH_LOGIN_FAIL,
  USER_AUTH_LOGIN_REQUEST,
  USER_AUTH_LOGIN_SUCCESS
} from './constants';

describe('uiResetError', () => {
  test('should return an action with type UI_RESET_ERROR', () => {
    const expectedResult = { type: UI_RESET_ERROR };
    const resultTest = uiResetError();
    expect(resultTest).toEqual(expectedResult);
  });
});

describe('createFilters', () => {
  const filters = 'filters';
  const actionThunk = createFilters(filters);

  describe('when create filters', () => {
    const dispatch = jest.fn();
    test('should dispatch an ADVERTS_SET_FILTERS', () => {
      actionThunk(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: ADVERTS_SET_FILTERS, payload: filters });
    });
  });
});

describe('authLogin', () => {
  const credentials = 'credentials';
  const actionThunk = authLogin(credentials);

  describe('when login API resolver', () => {
    //Mock data params function authLogin
    const api = { login: jest.fn().mockResolvedValue() }; //Resolver promise
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn()
    };

    test('should dispatch an USER_AUTH_LOGIN_REQUEST', () => {
      actionThunk(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: USER_AUTH_LOGIN_REQUEST });
    });

    test('should dispatch an api.login', () => {
      actionThunk(dispatch, getState, { api, history });
      expect(api.login).toHaveBeenCalledWith(credentials); //Mock call api
    });

    test('should dispatch an USER_AUTH_LOGIN_SUCCESS', async () => {
      await actionThunk(dispatch, getState, { api, history });
      // console.log(dispatch.mock.calls);
      expect(dispatch).toHaveBeenNthCalledWith(2, { type: USER_AUTH_LOGIN_SUCCESS });
    });

    test('should redirect to "/"', async () => {
      await actionThunk(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
    });
  });

  describe('when login API reject', () => {
    //Mock data params function authLogin
    const error = 'Unauthorized';
    const api = { login: jest.fn() }; //Mock function, other option use Promise.reject(error)
    const dispatch = jest.fn();
    const getState = () => {};

    test('should dispatch an USER_AUTH_LOGIN_FAIL', async () => {
      //If used directly without first declaring the function fails.
      //First the function is declared (const api = { login: jest.fn() })
      //and then inside the test it is called(api.login.mockRejectedValue(error);)
      api.login.mockRejectedValue(error);
      await actionThunk(dispatch, getState, { api });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: USER_AUTH_LOGIN_FAIL,
        error: true,
        payload: error
      });
    });
  });

  describe('when login API USER_AUTH_LOGIN_REQUEST', () => {});
});
